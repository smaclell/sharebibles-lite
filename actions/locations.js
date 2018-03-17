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

// Gets online locations only
export function fetchLocations() {
  return (dispatch, getState) => {
    const { regionKey } = getState();
    return apis.fetchLocations({ regionKey, last: 25 })
      .then((locations) => {
        locations.forEach(location => location && dispatch(receiveLocation(location)));
      });
  };
}

// Gets local and online (if possible) locations and combines them
export function fetchCombinedLocations() {
  return async (dispatch, getState) => {
    const { regionKey, connected } = getState();
    
    try {
      const localLocations = await database.fetchLocalLocations();
      if(connected) {
        const onlineLocations = await apis.fetchLocations({ regionKey, last: 25 });
        if(localLocations.length > 0) {
          const locations = mergeLocations(localLocations, onlineLocations);
          locations.forEach(location => location && dispatch(receiveLocation(location)));
        } else {
          onlineLocations.forEach(location => location && dispatch(receiveLocation(location)));
        }
      } else {
        localLocations.forEach(location => location && dispatch(receiveLocation(location)));
      }
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
          database.updateUploadStatus(options.key, 1);

          saved.catch(() => {
            dispatch(receiveLocation(original));
            dispatch(fetchLocation(original.key));
            database.updateUploadStatus(options.key, 0);
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
        .then(() => database.updateUploadStatus(localLocation.key, 1))
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
        .then(() => database.updateUploadStatus(localLocation.key, 1))
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
