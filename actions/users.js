import Sentry from 'sentry-expo';
import * as apis from '../apis';
import { fetchTeam } from './teams';

export const FETCH_USER = 'FETCH_USER';
export const RECEIVED_USER = 'RECEIVED_USER';

export function receiveUser(user) {
  return (dispatch) => {
    if (!user.key) {
      Sentry.captureMessage('Invalid user received', {
        extra: {
          user,
        },
      });
    }

    return dispatch({
      type: RECEIVED_USER,
      user,
    });
  };
}

export function fetchUser(userKey, deep = true) {
  return (dispatch) => { // eslint-disable-line arrow-body-style
    return apis.fetchUser(userKey)
      .then((user) => {
        if (!user) {
          return null;
        }

        dispatch(receiveUser(user));

        if (!deep) {
          return Promise.resolve();
        }

        return Promise.resolve()
          .then(() => dispatch(fetchTeam(user.teamKey)))
          .then(({ users = {} }) => {
            const userKeys = Object.keys(users);
            return Promise.all(
              userKeys.map(k => dispatch(fetchUser(k, false)).catch(() => {})),
            );
          });
      });
  };
}
