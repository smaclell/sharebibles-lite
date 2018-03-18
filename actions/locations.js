import Sentry from 'sentry-expo';
import * as apis from '../apis';
import { updatePosition } from './position';
import { failed, pending, uploaded } from './uploads';
import * as database from '../apis/database';
import { mergeLocations } from '../utils/database';

export const RECIEVE_LOCATION = 'RECIEVE_LOCATION';
export function receiveLocation(location) {
  return {
    type: RECIEVE_LOCATION,
    location,
  };
}

// Gets local and online (if possible) locations and combines them
export function fetchCombinedLocations() {
  return async (dispatch, getState) => {
    const { regionKey, connected } = getState();
    
    try {
      const localLocations = await database.fetchLocalLocations();
      let onlineLocations;
      if (connected) {
        onlineLocations = await apis.fetchLocations({ regionKey, last: 25 });
      }
      const locations = mergeLocations(localLocations, onlineLocations);
      locations.forEach(location => location && dispatch(receiveLocation(location)));
    } catch (err) {
      Sentry.captureException(err);
    }
  }
}

export function fetchLocation(locationKey) {
  return async (dispatch, getState) => {
    const { regionKey, connected } = getState();

    const localLocation = await database.fetchLocalLocation(locationKey);

    if (!localLocation && connected) {
      return apis.fetchLocation(regionKey, locationKey)
        .then((location) => {
          if (location) {
            dispatch(receiveLocation(location));
          }
          return location;
        });
    } else if (localLocation) {
      dispatch(receiveLocation(localLocation));
      return localLocation;
    } else {
      throw new Error('No location found matching given key');
    }
  };
}

export function fetchAllLocationData(locationKey) {
  return async (dispatch) => {
    await dispatch(fetchLocation(locationKey));
  };
}

export function updateLocation(options) {
  return async (dispatch, getState) => {
    const { regionKey, locations, connected } = getState();
    const original = { ...locations[options.key] };

    const isUpdated = await database.updateLocalLocation({ ...original, ...options });

    if (!isUpdated) {
      throw new Error('Unable to update location! Please try again.');
    }

    if (connected) {
      return apis.updateLocation(regionKey, { ...original, ...options })
        .then(({ updated, saved }) => {
          dispatch(receiveLocation({ ...original, ...updated }));

          saved
            .then(() => database.updateUploadStatus(options.key, database.LOCATION_UPLOADED.true))
            .catch(() => {
              dispatch(receiveLocation(original));
              dispatch(fetchLocation(original.key));
            });
        });
    }

    return true;
  };
}

export function createLocation(options) {
  const { latitude, longitude, resources, status } = options;

  return async (dispatch, getState) => {
    const { regionKey, connected } = getState();

    const locationData = { latitude, longitude, resources, status };

    dispatch(updatePosition(latitude, longitude));

    const localLocation = await database.addLocalLocation(locationData, regionKey);
    const key = localLocation.key;

    if (connected) {
      const { created: location, saved } = await apis.createLocation(regionKey, locationData, key);

      dispatch(pending(location.key));
      saved
        .then(() => dispatch(receiveLocation(location)))
        .then(() => database.updateUploadStatus(localLocation.key, database.LOCATION_UPLOADED.true))
        .then(() => dispatch(uploaded(location.key)))
        .catch((err) => {
          Sentry.captureException(err, {
            extra: {
              locationKey: location.key,
            },
          });
          dispatch(failed(location.key));
        });
    } else {
      dispatch(receiveLocation(localLocation));
    }
  };
}

export function pushLocalLocations() {
  return async (dispatch, getState) => {
    const { regionKey, connected } = getState();
    if (!connected) {
      return false;
    }

    const offlineLocations = await database.getLocalOnlyLocations();
    if (!offlineLocations) {
      return false;
    }
    
    for (const localLocation of offlineLocations) {
      const { latitude, longitude } = localLocation;
      const { created: location, saved } = await apis.createLocation(regionKey, { latitude, longitude }, location.key);

      dispatch(pending(location.key));
      saved
        .then(() => database.updateUploadStatus(localLocation.key, database.LOCATION_UPLOADED.true))
        .then(() => dispatch(uploaded(location.key)))
        .catch((err) => {
          Sentry.captureException(err, {
            extra: {
              locationKey: location.key,
            },
          });
          dispatch(failed(location.key));
        });
    }

    return true;
  }
}
