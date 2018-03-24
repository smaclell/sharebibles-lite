import Sentry from 'sentry-expo';
import * as apis from '../apis';
//import { updatePosition } from './position';
import { failed, pending, uploaded } from './uploads';
import * as database from '../apis/database';

function wrapper(work, location) {
  return async (dispatch) => {
    dispatch(pending(location.key));

    try {
      await work;
      await database.updateUploadStatus(location.key, database.LOCATION_UPLOADED.true);
      dispatch(uploaded(location.key));
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          locationKey: location.key,
        },
      });

      dispatch(failed(location.key));
    }
  };
}


export const RECIEVE_LOCATION = 'RECIEVE_LOCATION';
export function receiveLocation(location) {
  return {
    type: RECIEVE_LOCATION,
    location,
  };
}

// Restores the local local locations, other locations are loaded by the geo query
export function restoreLocalLocations() {
  return async (dispatch) => {
    try {
      const locations = await database.fetchLocalLocations();
      locations.forEach(location => location && dispatch(receiveLocation(location)));
    } catch (err) {
      Sentry.captureException(err);
    }
  };
}

export function fetchLocation(locationKey) {
  return (dispatch, getState) => {
    const { regionKey, connected } = getState();
    if (!connected) {
      return Promise.resolve();
    }

    return apis.fetchLocation(locationKey, regionKey)
      .then((location) => {
        if (location) {
          dispatch(receiveLocation(location));
        }
      });
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

    // dispatch(updatePosition(latitude, longitude)); Is this needed?

    const localLocation = await database.addLocalLocation(locationData, regionKey);
    console.log(localLocation);
    const key = localLocation.key;

    dispatch(pending(localLocation.key));
    dispatch(receiveLocation(localLocation));
    if (connected) {
      const { created: location, saved } = await apis.createLocation(regionKey, locationData, key);

      wrapper(saved, location);
    }
  };
}

export function pushLocalLocations() {
  return async (dispatch, getState) => {
    const { regionKey, connected } = getState();
    if (!connected) {
      return false;
    }

    const offlineLocations = await database.fetchLocalLocations(true);
    if (!offlineLocations) {
      return false;
    }
    
    for (const localLocation of offlineLocations) {
      const { latitude, longitude } = localLocation;
      const { created: location, saved } = await apis.createLocation(regionKey, { latitude, longitude }, location.key);

      wrapper(saved, location);
    }

    return true;
  };
}
