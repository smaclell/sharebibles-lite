import * as apis from '../apis';
import * as positionActions from './position';
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
      .then(() => dispatch(positionActions.initialize()))
      .then(() => dispatch(usersActions.receiveUser(user)))
      .then(() => dispatch(usersActions.fetchUser(user.key)))
      .then(() => dispatch(userActions.setUser(user)))
      .then(() => dispatch(visitActions.fetchLastVisits(onReceived)))
      .then(() => dispatch(visitActions.startListener(onReceived)));
  };
}

export function restoreSignIn(navigate) {
  return (dispatch) => {
    apis.restoreSignIn((user) => {
      return Promise.resolve()
        .then(() => dispatch(onAuthenticated(user)))
        .then(navigate);
    });
  };
}

export const SIGN_OUT = 'SIGN_OUT';
export function signOut() {
  return dispatch =>
    Promise.resolve()
      .then(() => apis.signOut())
      .then(() => dispatch({ type: 'SIGN_OUT' }));
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
      .then(() => apis.signUp(name, email, password, accessCode))
      .then(user => dispatch(onAuthenticated(user)));
}

export function shareInvite() {
  return () =>
    Promise.resolve()
      .then(() => apis.createAccessCode())
      .then(({ raw }) => ({ title: 'Join my Share Bibles team', message: raw }));
}
