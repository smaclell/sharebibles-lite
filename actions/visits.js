import Sentry from 'sentry-expo';
import * as apis from '../apis';
import { failed, pending, uploaded } from './uploads';
import { updateLocation } from './locations';

export const RECEIVE_VISIT = 'RECEIVE_VISIT';
export function receiveVisit(visit) {
  return (dispatch, getState) => {
    const { user: userKey, users } = getState();
    const { teamKey } = users[userKey];

    return dispatch({
      type: RECEIVE_VISIT,
      visit,
      userKey,
      teamKey,
    });
  };
}

export function fetchLastVisits(onReceived) {
  return (dispatch, getState) => {
    const { user: userKey } = getState();

    return apis.fetchVisits({ userKey, last: 25 })
      .then(visits => visits.forEach(onReceived));
  };
}

export function fetchVisitsByLocation(locationKey) {
  return async (dispatch) => {
    const visits = await apis.fetchVisitsByLocation(locationKey);
    visits.forEach(visit => visit && dispatch(receiveVisit(visit)));
  };
}

export function startListener(onReceived) {
  return (dispatch, getState) => {
    const { user: userKey } = getState();
    apis.startVisitListener(userKey, onReceived);
  };
}

export function createVisit({ locationKey, notes, status = 'unknown', tags = {} }) {
  // eslint-disable-next-line consistent-return
  return async (dispatch, getState) => {
    // TODO: selector
    const state = getState();
    const creator = state.users[state.user];
    const visitors = state.visitors;

    const { created: visit, saved } = await
      apis.createVisit(locationKey, creator, { notes, status, tags, visitors });

    dispatch(pending(visit.key));
    saved
      .then(() => dispatch(uploaded(visit.key)))
      .catch((err) => {
        Sentry.captureException(err, {
          extra: {
            userKey: creator.key,
            locationKey,
            visitKey: visit.key,
          },
        });
        dispatch(failed(visit.key));
      });

    dispatch(receiveVisit(visit));
    if (!tags.initial && status !== 'unknown') {
      return dispatch(updateLocation({ key: locationKey, status }));
    }
  };
}
