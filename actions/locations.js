import Sentry from 'sentry-expo';
import * as apis from '../apis';
import { requestPushPermission } from './permissions';
import { containing } from './regions';
import { failed, pending, uploaded } from './uploads';
import * as database from '../apis/database';
import { LOCATION_UPLOADED } from '../utils/database';

export const RECIEVE_LOCATION = 'RECIEVE_LOCATION';
function receiveLocation(location) {
  return {
    type: RECIEVE_LOCATION,
    location,
  };
}

export const CLEAR_LOCATIONS = 'CLEAR_LOCATIONS';
export function clearLocations() {
  return {
    type: CLEAR_LOCATIONS,
  };
}

function updateUploadStatus(location, isUploaded) {
  return (dispatch) => {
    const newLocation = { ...location, uploaded: isUploaded };
    dispatch(receiveLocation(newLocation));
    const numericValue =
      isUploaded ? LOCATION_UPLOADED.true : LOCATION_UPLOADED.false;

    return database.updateUploadStatus(newLocation.key, numericValue);
  };
}

function wrapper(work, location) {
  return async (dispatch) => {
    dispatch(pending(location.key));

    try {
      await work;
      await dispatch(updateUploadStatus(location, true));
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
  return async (dispatch, getState) => {
    const { authentication: { regionKey }, connected } = getState();
    if (!connected || !regionKey) {
      return;
    }

    try {
      const location = await apis.fetchLocation(locationKey, regionKey);
      if (location) {
        dispatch(receiveLocation({ ...location, uploaded: true }));
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
}

export function fetchAllLocationData(locationKey) {
  return async (dispatch) => {
    await dispatch(fetchLocation(locationKey));
  };
}

export function createLocation(options) {
  const {
    latitude, longitude, resources, status,
  } = options;

  return async (dispatch, getState) => {
    const { authentication: { regionKey: hasRegion }, connected } = getState();

    const locationData = {
      latitude, longitude, resources, status,
    };

    const localLocation = await database.addLocalLocation(locationData);
    const { key } = localLocation;

    dispatch(pending(key));
    dispatch(receiveLocation(localLocation));
    if (connected && hasRegion) {
      const allowed = await dispatch(requestPushPermission());
      if (!allowed) {
        return;
      }

      const regionKey = dispatch(containing(locationData));
      if (!regionKey) {
        dispatch(failed(key));
        return;
      }

      const { created: location, saved } = await apis.createLocation(regionKey, locationData, key);

      await dispatch(wrapper(saved, location));
    }
  };
}

export function pushLocalLocations() {
  return async (dispatch, getState) => {
    const { authentication: { regionKey: hasRegion }, connected } = getState();
    if (!connected || !hasRegion) {
      return false;
    }

    const offlineLocations = await database.fetchLocalLocations(true);
    if (!offlineLocations) {
      return false;
    }

    offlineLocations.forEach(({ key }) => dispatch(pending(key)));

    await Promise.all(offlineLocations.map(async ({ key, ...options }) => {
      const regionKey = dispatch(containing(options));
      if (!regionKey) {
        dispatch(failed(key));
        return;
      }

      const { created: location, saved } = await apis.createLocation(regionKey, options, key);
      dispatch(wrapper(saved, location));
    }));

    return true;
  };
}
