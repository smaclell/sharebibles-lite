import moment from 'moment';
import Expo from 'expo';
import * as firebase from 'firebase';

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

export function createLocation(options) {
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
    tags: [], // Actions performed, too technical?
    notes: '',
    teamKey: creator.teamKey,
    ...options,
  };

  // TODO: use the server timestamp created: firebase.database.ServerValue.TIMESTAMP,

  const saved = pushed.set(created);

  const link = firebase.database().ref(`visitByLocation/${created.locationKey}/visits`).update({
    [pushed.key]: true,
  });

  return Promise.resolve({
    created,
    saved: Promise.all([saved, link]),
  });
}
