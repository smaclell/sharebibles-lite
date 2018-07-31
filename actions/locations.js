import Sentry from 'sentry-expo';
import * as apis from '../apis';
import { failed, pending, uploaded } from './uploads';
import * as database from '../apis/database';

export const RECIEVE_LOCATION = 'RECIEVE_LOCATION';
export function receiveLocation(location) {
  return {
    type: RECIEVE_LOCATION,
    location,
  };
}

export function updateUploadStatus(location, isUploaded) {
  return (dispatch) => {
    const newLocation = { ...location, uploaded: isUploaded };
    dispatch(receiveLocation(newLocation));
    const numericValue =
      isUploaded ? database.LOCATION_UPLOADED.true : database.LOCATION_UPLOADED.false;

    return database.updateUploadStatus(newLocation.key, numericValue);
  };
}

function wrapper(work, location) {
  return async (dispatch) => {
    dispatch(pending(location.key));

    try {
      await work;
      await updateUploadStatus(location, true);
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

// Restores the local local locations, other locations are loaded by the geo query
export function restoreLocalLocations() {
  return async (dispatch) => {
    try {
      const locations = await database.fetchLocalLocations();
      locations.filter(Boolean)
        .forEach((location) => {
          dispatch(receiveLocation(location));

          const process = location.uploaded ? uploaded : pending;
          dispatch(process(location.key));
        });
    } catch (err) {
      Sentry.captureException(err);
    }
  };
}

export function fetchLocation(locationKey) {
  return (dispatch, getState) => {
    const { authentication: { regionKey }, connected } = getState();
    if (!connected || !regionKey) {
      return Promise.resolve();
    }

    return apis.fetchLocation(locationKey, regionKey)
      .then((location) => {
        if (location) {
          dispatch(receiveLocation({ ...location, uploaded: true }));
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
    const { authentication: { regionKey }, locations, connected } = getState();
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
            .then(() => updateUploadStatus({ ...original, ...updated }, true))
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
  const {
    latitude, longitude, resources, status,
  } = options;

  return async (dispatch, getState) => {
    const { authentication: { regionKey }, connected } = getState();

    const locationData = {
      latitude, longitude, resources, status,
    };

    const localLocation = await database.addLocalLocation(locationData, regionKey);
    const { key } = localLocation;

    dispatch(pending(key));
    dispatch(receiveLocation(localLocation));
    if (connected && regionKey) {
      const { created: location, saved } = await apis.createLocation(regionKey, locationData, key);

      await dispatch(wrapper(saved, location));
    }
  };
}

export function pushLocalLocations() {
  return async (dispatch, getState) => {
    const { authentication: { regionKey }, connected } = getState();
    if (!connected) {
      return false;
    }

    const offlineLocations = await database.fetchLocalLocations(true);
    if (!offlineLocations) {
      return false;
    }

    await Promise.all(offlineLocations.map(({ key, ...options }) => {
      return apis.createLocation(regionKey, options, key)
        .then(({ created: location, saved }) => dispatch(wrapper(saved, location)));
    }));

    return true;
  };
}
