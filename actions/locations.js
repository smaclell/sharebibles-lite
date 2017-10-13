import * as apis from '../apis';
import { createVisit } from './visits';

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
        dispatch(receiveLocation(location));
        return Promise.resolve(location);
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

    const locationData = {
      imageUrl,
      name,
      latitude,
      longitude,
      address,
      resources,
      tags,
    };

    return Promise.resolve()
      .then(() => apis.createLocation(creator, locationData))
      .then(({ created: location }) => {
        dispatch(receiveLocation(location));

        return dispatch(createVisit({ locationKey: location.key, notes, status, tags: { ...tags, initial: true } }));
      });
  };
}
