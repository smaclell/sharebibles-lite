import { createFakeDistribution } from './testData';
import { createVisit } from './visits';

export const CREATED_DISTRIBUTION = 'CREATED_DISTRIBUTION';

export function createDistribution(options) {
  const { imageUrl, latitude, longitude, bibles } = options;
  const { notes } = options;

  return (dispatch) => {
    // TODO: Firebase
    const distribution = createFakeDistribution({ imageUrl, latitude, longitude, bibles });

    dispatch({
      type: CREATED_DISTRIBUTION,
      distribution,
    });

    dispatch(createVisit({ distributionId: distribution.id, notes }));

    return Promise.resolve();
  };
}
