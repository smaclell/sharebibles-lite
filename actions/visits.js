import * as apis from '../apis';

export const CREATE_VISIT = 'CREATE_VISIT';

export function createVisit({ locationKey, notes, status = null, tags = {} }) {
  return (dispatch, getState) => {
    // TODO: selector
    const state = getState();
    const creator = state.users[state.user];

    return apis.createVisit(locationKey, creator, { notes, status, tags })
      .then(({ created: visit }) => dispatch({ type: CREATE_VISIT, visit }));
  };
}
