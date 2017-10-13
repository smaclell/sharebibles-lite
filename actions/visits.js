import * as apis from '../apis';

export const RECEIVE_VISIT = 'RECEIVE_VISIT';
function receiveVisit(visit) {
  return { type: RECEIVE_VISIT, visit };
}

export function fetchLastVisits() {
  return (dispatch, getState) => {
    const { user: userKey } = getState();

    const visitor = v => dispatch(receiveVisit(v));

    return apis.fetchVisits({ userKey, last: 10 })
      .then(visits => visits.forEach(visitor));
  };
}

export function startListener() {
  return (dispatch, getState) => {
    const { user: userKey } = getState();
    apis.startVisitListener(userKey, visit => dispatch(receiveVisit(visit)));
  };
}

export function createVisit({ locationKey, notes, status = null, tags = {} }) {
  return (dispatch, getState) => {
    // TODO: selector
    const state = getState();
    const creator = state.users[state.user];

    return apis.createVisit(locationKey, creator, { notes, status, tags })
      .then(({ created: visit }) => dispatch(receiveVisit(visit)));
  };
}
