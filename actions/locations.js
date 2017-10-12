import * as apis from '../apis';
import { createVisit } from './visits';

export const CREATED_LOCATION = 'CREATED_LOCATION';

export function createLocation(options) {
  const { imageUrl, name, latitude, longitude, address, resources } = options;
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
    };

    return Promise.resolve()
      .then(() => apis.createLocation(creator, locationData))
      .then(({ created: location }) => {
        dispatch({
          type: CREATED_LOCATION,
          location,
        });

        return dispatch(createVisit({ locationKey: location.key, notes, tags: { initial: true } }));
      });
  };
}
