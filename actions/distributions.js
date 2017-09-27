import { createFakeDistribution } from './testData';
import { createVisit } from './visits';

export const CREATED_DISTRIBUTION = 'CREATED_DISTRIBUTION';

export function createDistribution(options) {
  const { imageUrl, name, latitude, longitude, address, bibles } = options;
  const { notes } = options;

  return (dispatch) => {
    // TODO: Firebase
    const distribution = createFakeDistribution({
      imageUrl,
      name,
      latitude,
      longitude,
      address,
      bibles,
    });

    dispatch({
      type: CREATED_DISTRIBUTION,
      distribution,
    });

    dispatch(createVisit({ distributionId: distribution.id, notes }));

    return Promise.resolve();
  };
}
