import { createFakeVisit } from './testData';

export const CREATE_VISIT = 'CREATE_VISIT';

export function createVisit({ distributionId, notes }) {
  return (dispatch, getState) => {
    // TODO FIREBASE

    // TODO: selector
    const state = getState();
    const creator = state.users[state.user];
    const visit = createFakeVisit(distributionId, creator, { notes });

    dispatch({
      type: CREATE_VISIT,
      visit,
    });

    return Promise.resolve();
  };
}
