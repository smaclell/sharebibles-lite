import moment from 'moment';
import Expo from 'expo';
import * as firebase from 'firebase';

export function initialize() {
  if (firebase.initialized) {
    return;
  }

  firebase.initialized = true;
  firebase.initializeApp(Expo.Constants.manifest.extra.firebase);
}

export function signIn(email, password) {
  initialize();

  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ uid }) => firebase.database().ref(`users/${uid}`).once('value').then(v => v.val()));
}

export function fetchTeam(teamKey) {
  initialize();
  return firebase.database().ref(`teams/${teamKey}`).once('value').then(v => v.val());
}

export function fetchUser(userKey) {
  initialize();
  return firebase.database().ref(`users/${userKey}`).once('value').then(v => v.val());
}

export function createLocation(creator, options) {
  initialize();

  const pushed = firebase.database().ref('locations').push();
  const created = {
    key: pushed.key,
    name: 'Anything', // TODO: Remove the name
    imageUrl: 'https://google.com/favicon.ico',
    created: moment.utc().valueOf(),
    latitude: 50,
    longitude: 50,
    address: null,
    status: null,
    resources: {}, // { given: number, needed: number }
    createdBy: creator.key,
    teamKey: creator.teamKey,
    // tags|status:
    // Considering a tag/status object/array to represent the many checkboxes
    // Initially it would be populated/managed by a number of hardcoded values
    ...options,
  };

  const saved = pushed.set(created);

  return Promise.resolve({
    created,
    saved,
  });
}

export function createVisit(locationKey, creator, options) {
  initialize();
  const pushed = firebase.database().ref('visits').push();
  const created = {
    key: pushed.key,
    locationKey,
    created: moment.utc().valueOf(),
    createdBy: creator.key,
    visitors: {
      [creator.key]: true,
    },
    status: null,
    tags: {},
    notes: '',
    teamKey: creator.teamKey,
    ...options,
  };

  // TODO: use the server timestamp created: firebase.database.ServerValue.TIMESTAMP,

  const saved = pushed.set(created);

  const byLocation = firebase.database().ref(`visitsByLocation/${created.locationKey}/visits`).update({
    [pushed.key]: true,
  });

  const byUser = Object.keys(created.visitors)
    .map(userKey => `visitsByLocation/${userKey}/${pushed.key}`)
    .map(path => firebase.database().ref(path).set(created));

  return Promise.resolve({
    created,
    saved: Promise.all([saved, byLocation, ...byUser]),
  });
}


