import * as firebase from 'firebase';
import Expo from 'expo';

export function initialize() {
  if (firebase.initialized) {
    return;
  }

  firebase.initialized = true;
  firebase.initializeApp(Expo.Constants.manifest.extra);
}

export function signIn() {
  initialize();
  return firebase.database().ref('users/scott').once('value').then(v => v.val());
}

export function fetchTeam(teamKey) {
  initialize();
  return firebase.database().ref(`teams/${teamKey}`).once('value').then(v => v.val());
}

export function fetchUser(userKey) {
  initialize();
  return firebase.database().ref(`users/${userKey}`).once('value').then(v => v.val());
}

export function createLocation(create) {
  initialize();
  const pushed = firebase.database().ref('locations').push();
  const created = {
    key: pushed.key,
    ...create,
  };

  const saved = pushed.set(created);

  return {
    created,
    saved,
  };
}

export function createVisit(create) {
  initialize();
  const pushed = firebase.database().ref('visits').push();
  const created = {
    key: pushed.key,
    ...create,
  };

  // TODO: use the server timestamp created: firebase.database.ServerValue.TIMESTAMP,

  const saved = pushed.set(created);

  const link = firebase.database().ref(`visitByLocation/${create.locationKey}/visits`).update({
    [pushed.key]: true,
  });

  return {
    created,
    saved: Promise.all([saved, link]),
  };
}
