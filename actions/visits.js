import * as apis from '../apis';
import { failed, pending, uploaded } from './uploads';

export const RECEIVE_VISIT = 'RECEIVE_VISIT';
function receiveVisit(visit) {
  return { type: RECEIVE_VISIT, visit };
}

export function fetchLastVisits() {
  return (dispatch, getState) => {
    const { user: userKey } = getState();

    const visitor = v => dispatch(receiveVisit(v));

    return apis.fetchVisits({ userKey, last: 25 })
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
      .then(({ created: visit, saved }) => {
        dispatch(pending(visit.key));
        saved
          .then(() => dispatch(uploaded(visit.key)))
          .catch(() => dispatch(failed(visit.key)));

        dispatch(receiveVisit(visit));
      });
  };
}
