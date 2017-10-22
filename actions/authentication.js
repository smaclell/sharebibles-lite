import * as apis from '../apis';
import * as locationActions from './locations';
import * as userActions from './user';
import * as usersActions from './users';
import * as visitActions from './visits';

function onAuthenticated(user) {
  return (dispatch) => {
    const onReceived = (visit) => {
      dispatch(visitActions.receiveVisit(visit));
      dispatch(locationActions.fetchLocation(visit.locationKey));
    };

    return Promise.resolve()
      .then(() => dispatch(usersActions.receiveUser(user)))
      .then(() => dispatch(usersActions.fetchUser(user.key)))
      .then(() => dispatch(userActions.setUser(user)))
      .then(() => dispatch(visitActions.fetchLastVisits(onReceived)))
      .then(() => dispatch(visitActions.startListener(onReceived)));
  };
}

export function signIn(email, password) {
  return dispatch =>
    Promise.resolve()
      .then(() => apis.signIn(email, password))
      .then(user => dispatch(onAuthenticated(user)));
}

export function signUp(name, email, password, accessCode) {
  return dispatch =>
    Promise.resolve()
      .then(() => apis.signUp(email, password, accessCode))
      .then(user => dispatch(onAuthenticated(user)));
}
