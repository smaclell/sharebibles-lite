import { createFakeLocation } from './testData';
import { createVisit } from './visits';

export const CREATED_LOCATION = 'CREATED_LOCATION';

export function createLocation(options) {
  const { imageUrl, name, latitude, longitude, address, resources } = options;
  const { notes } = options;

  return (dispatch) => {
    // TODO: Firebase
    const location = createFakeLocation({
      imageUrl,
      name,
      latitude,
      longitude,
      address,
      resources,
    });

    dispatch({
      type: CREATED_LOCATION,
      location,
    });

    dispatch(createVisit({ locationKey: location.key, notes }));

    return Promise.resolve();
  };
}
