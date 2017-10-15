import * as apis from '../apis';
import { createVisit } from './visits';
import { failed, pending, uploaded } from './uploads';

export const CREATED_LOCATION = 'CREATED_LOCATION';

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
      .then(({ created: location, saved }) => {
        dispatch({
          type: CREATED_LOCATION,
          location,
        });

        dispatch(pending(location.key));
        saved
          .then(() => dispatch(uploaded(location.key)))
          .catch(() => dispatch(failed(location.key)));

        return dispatch(createVisit({ locationKey: location.key, notes, status, tags: { ...tags, initial: true } }));
      });
  };
}
