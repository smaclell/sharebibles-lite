import * as apis from '../apis';
import * as locationActions from './locations';
import * as userActions from './user';
import * as usersActions from './users';
import * as visitActions from './visits';

export function signIn(email, password) {
  return (dispatch) => {
    const onReceived = (visit) => {
      dispatch(visitActions.receiveVisit(visit));
      dispatch(locationActions.fetchLocation(visit.locationKey));
    };

    let user;
    return Promise.resolve()
      .then(() => apis.signIn(email, password))
      .then((found) => {
        user = found;
      })
      .then(() => dispatch(usersActions.receiveUser(user)))
      .then(() => dispatch(usersActions.fetchUser(user.key)))
      .then(() => dispatch(userActions.setUser(user)))
      .then(() => dispatch(visitActions.fetchLastVisits(onReceived)))
      .then(() => dispatch(visitActions.startListener(onReceived)));
  };
}

export function signUp() {
  throw new Error('signUp is not implemented yet');
}
