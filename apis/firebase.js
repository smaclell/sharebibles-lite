import * as firebase from 'firebase';

export function initialize() {
  if (firebase.initialized) {
    return;
  }

  firebase.initialized = true;
  const firebaseConfig = {
    apiKey: 'AIzaSyC8AO42wX7wmzhZ4jY4rAnAOPbDPIBb5xg',
    authDomain: 'sharebible-scott.firebaseapp.com',
    databaseURL: 'https://sharebible-scott.firebaseio.com',
    projectId: 'sharebible-scott',
    storageBucket: 'sharebible-scott.appspot.com',
    messagingSenderId: '717650859495',
  };

  firebase.initializeApp(firebaseConfig);
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

  const saved = pushed.set(created);

  const link = firebase.database().ref(`visitByLocation/${create.locationKey}/visits`).update({
    [pushed.key]: true,
  });

  return {
    created,
    saved: Promise.all([saved, link]),
  };
}
