import * as apis from '../apis';
import { updatePosition } from './position';
import { createVisit, fetchVisitsByLocation } from './visits';
import { failed, pending, uploaded } from './uploads';

export const RECIEVE_LOCATION = 'RECIEVE_LOCATION';
export function receiveLocation(location) {
  return { type: RECIEVE_LOCATION, location };
}

export function fetchLocation(locationKey) {
  return (dispatch, getState) => {
    const { locations } = getState();
    const existing = locations[locationKey];
    if (existing) {
      return Promise.resolve(existing);
    }

    return apis.fetchLocation(locationKey)
      .then((location) => {
        if (location) {
          dispatch(receiveLocation(location));
        }
        return Promise.resolve(location);
      });
  };
}

export function fetchAllLocationData(locationKey) {
  return async (dispatch) => {
    await dispatch(fetchVisitsByLocation(locationKey));
    await dispatch(fetchLocation(locationKey));
  };
}

export function updateLocation(options) {
  return (dispatch, getState) => {
    const { locations } = getState();
    const original = { ...locations[options.key] };

    return apis.updateLocation({ ...original, ...options })
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
  const { imageUrl, name, latitude, longitude, address, resources, tags, status } = options;
  const { notes } = options;

  return (dispatch, getState) => {
    // TODO: selector
    const state = getState();
    const creator = state.users[state.user];
    const team = state.teams[creator.teamKey];

    const locationData = {
      imageUrl,
      name,
      latitude,
      longitude,
      address,
      resources,
      status,
      tags,
    };

    dispatch(updatePosition(latitude, longitude));

    return Promise.resolve()
      .then(() => apis.createLocation(creator, team, locationData))
      .then(({ created: location, saved }) => {
        dispatch(receiveLocation(location));

        dispatch(pending(location.key));
        saved
          .then(() => dispatch(uploaded(location.key)))
          .catch(() => dispatch(failed(location.key)));

        return dispatch(createVisit({
          locationKey: location.key,
          notes,
          status,
          tags: { ...tags, initial: true },
        }));
      });
  };
}
