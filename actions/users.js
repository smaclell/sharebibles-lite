import * as apis from '../apis';
import { fetchTeam } from './teams';

export const FETCH_USER = 'FETCH_USER';
export const RECEIVED_USER = 'RECEIVED_USER';

export function receiveUser(user) {
  return {
    type: RECEIVED_USER,
    user,
  };
}

export function fetchUser(userKey) {
  return (dispatch) => { // eslint-disable-line arrow-body-style
    return apis.fetchUser(userKey)
      .then((user) => {
        if (!user) {
          return null;
        }

        dispatch(receiveUser(user));

        return dispatch(fetchTeam(user.teamKey));
      });
  };
}
