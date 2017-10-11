import * as apis from '../apis';
import * as userActions from './user';
import * as usersActions from './users';

export function signIn() {
  return (dispatch) => {
    let user;
    return Promise.resolve()
      .then(() => apis.signIn())
      .then((found) => {
        user = found;
      })
      .then(() => dispatch(usersActions.receiveUser(user)))
      .then(() => dispatch(usersActions.fetchUser(user.key)))
      .then(() => dispatch(userActions.setUser(user)));
  };
}

export function signUp() {
  throw new Error('signUp is not implemented yet');
}
