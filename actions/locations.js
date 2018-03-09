import Sentry from 'sentry-expo';
import * as apis from '../apis';
import { updatePosition } from './position';
import { failed, pending, uploaded } from './uploads';

export const RECIEVE_LOCATION = 'RECIEVE_LOCATION';
export function receiveLocation(location) {
  return {
    type: RECIEVE_LOCATION,
    location,
  };
}

export function fetchLocations() {
  return (dispatch, getState) => {
    const { regionKey } = getState();
    return apis.fetchLocations({ regionKey, last: 25 })
      .then((locations) => {
        locations.forEach(location => location && dispatch(receiveLocation(location)));
      });
  };
}

export function fetchLocation(locationKey) {
  return (dispatch, getState) => {
    const { regionKey } = getState();

    return apis.fetchLocation(regionKey, locationKey)
      .then((location) => {
        if (location) {
          dispatch(receiveLocation(location));
        }
        return location;
      });
  };
}

export function fetchAllLocationData(locationKey) {
  return async (dispatch) => {
    await dispatch(fetchLocation(locationKey));
  };
}

export function updateLocation(options) {
  return (dispatch, getState) => {
    const { regionKey, locations } = getState();
    const original = { ...locations[options.key] };

    return apis.updateLocation(regionKey, { ...original, ...options })
      .then(({ updated, saved }) => {
        dispatch(receiveLocation({ ...original, ...updated }));

        saved.catch(() => {
          dispatch(receiveLocation(original));
          dispatch(fetchLocation(original.key));
        });
      });
  };
}

export function createLocation(options) {
  const { latitude, longitude, resources, status } = options;

  return async (dispatch, getState) => {
    const { regionKey } = getState();

    const locationData = {
      latitude,
      longitude,
      resources,
      status,
    };

    dispatch(updatePosition(latitude, longitude));

    const { created: location, saved } =
      await apis.createLocation(regionKey, locationData);

    dispatch(receiveLocation(location));

    dispatch(pending(location.key));
    saved
      .then(() => dispatch(uploaded(location.key)))
      .catch((err) => {
        Sentry.captureException(err, {
          extra: {
            locationKey: location.key,
          },
        });
        dispatch(failed(location.key));
      });
  };
}
