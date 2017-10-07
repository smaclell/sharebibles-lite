import { user as testUser } from './testData';
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
  return (dispatch) => {
    // TODO FIREBASE
    if (testUser.key !== userKey) {
      return Promise.resolve();
    }

    dispatch(receiveUser(testUser));

    return dispatch(fetchTeam(testUser.teamKey));
  };
}
