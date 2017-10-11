import * as apis from '../apis';

export const CREATE_VISIT = 'CREATE_VISIT';

export function createVisit({ locationKey, notes }) {
  return (dispatch, getState) => {
    // TODO: selector
    const state = getState();
    const creator = state.users[state.user];

    return apis.createVisit(locationKey, creator, { notes })
      .then(({ created: visit }) => dispatch({ type: CREATE_VISIT, visit }));
  };
}
