import * as apis from '../apis';

export const RECEIVE_VISIT = 'RECEIVE_VISIT';
export function receiveVisit(visit) {
  return { type: RECEIVE_VISIT, visit };
}

export function fetchLastVisits(onReceived) {
  return (dispatch, getState) => {
    const { user: userKey } = getState();

    return apis.fetchVisits({ userKey, last: 10 })
      .then(visits => visits.forEach(onReceived));
  };
}

export function startListener(onReceived) {
  return (dispatch, getState) => {
    const { user: userKey } = getState();
    apis.startVisitListener(userKey, onReceived);
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
