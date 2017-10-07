import { user as testUser } from './testData';
import * as userActions from './user';
import * as usersActions from './users';

export function signIn() {
  return (dispatch) => {
    const user = testUser;
    return Promise.resolve()
      .then(() => dispatch(usersActions.receiveUser(user)))
      .then(() => dispatch(usersActions.fetchUser(user.key)))
      .then(() => dispatch(userActions.setUser(user)));
  };
}

export function signUp() {
  throw new Error('signUp is not implemented yet');
}
