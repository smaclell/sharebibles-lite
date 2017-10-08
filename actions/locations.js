import * as apis from '../apis';
import { createVisit } from './visits';

export const CREATED_LOCATION = 'CREATED_LOCATION';

export function createLocation(options) {
  const { imageUrl, name, latitude, longitude, address, resources } = options;
  const { notes } = options;

  return (dispatch) => {
    const locationData = {
      imageUrl,
      name,
      latitude,
      longitude,
      address,
      resources,
    };

    return Promise.resolve()
      .then(() => apis.createLocation(locationData))
      .then(({ created: location }) => {
        dispatch({
          type: CREATED_LOCATION,
          location,
        });

        return dispatch(createVisit({ locationKey: location.key, notes }));
      });
  };
}
