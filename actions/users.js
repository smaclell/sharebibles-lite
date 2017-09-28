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

export function fetchUser(userId) {
  return (dispatch) => {
    // TODO FIREBASE
    if (testUser.id !== userId) {
      return Promise.resolve();
    }

    dispatch(receiveUser(testUser));

    return dispatch(fetchTeam(testUser.teamId));
  };
}
