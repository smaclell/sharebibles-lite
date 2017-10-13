import * as apis from '../apis';
import * as userActions from './user';
import * as usersActions from './users';
import * as visitActions from './visits';

export function signIn(email, password) {
  return (dispatch) => {
    let user;
    return Promise.resolve()
      .then(() => apis.signIn(email, password))
      .then((found) => {
        user = found;
      })
      .then(() => dispatch(usersActions.receiveUser(user)))
      .then(() => dispatch(usersActions.fetchUser(user.key)))
      .then(() => dispatch(userActions.setUser(user)))
      .then(() => dispatch(visitActions.fetchLastVisits()))
      .then(() => dispatch(visitActions.startListener()));
  };
}

export function signUp() {
  throw new Error('signUp is not implemented yet');
}
