import moment from 'moment';
import Expo from 'expo';
import * as firebase from 'firebase';
import GeoFire from 'geofire';

export function initialize() {
  if (firebase.initialized) {
    return;
  }

  firebase.initialized = true;
  firebase.initializeApp(Expo.Constants.manifest.extra.firebase);
}

function getGeoFire() {
  initialize();

  const ref = firebase.database().ref('geofire');
  return new GeoFire(ref);
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

export function fetchVisits({ userKey, last }) {
  initialize();
  return firebase.database()
    .ref(`visitsByUser/${userKey}`)
    .limitToLast(last)
    .once('value')
    .then(visits => Object.values(visits.val() || {}))
    .catch(() => []);
}

export function fetchLocation(locationKey) {
  initialize();
  return firebase.database()
    .ref(`locations/${locationKey}`)
    .once('value')
    .then(location => location.val());
}

export function startVisitListener(userKey, onReceived) {
  initialize();
  firebase.database().ref(`visitsByUser/${userKey}`)
    .on('child_added', data => onReceived(data.val()));
}

export function updateLocation(options) {
  initialize();

  const { key, status } = options;
  const updated = { status };

  const updateKeys = {};
  Object.entries(updated).forEach(([item, value]) => {
    // Don't update values if it wasn't provided:
    if (value === undefined) { return; }
    updateKeys[`${key}/${item}`] = value;
  });

  const saved = firebase.database().ref('locations').update(updateKeys);

  return Promise.resolve({ updated, saved });
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
  const geo = getGeoFire().set(`locations--${pushed.key}`, [created.latitude, created.longitude]);

  return Promise.resolve({
    created,
    saved: Promise.all([saved, geo]),
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
    .map(userKey => `visitsByUser/${userKey}/${pushed.key}`)
    .map(path => firebase.database().ref(path).set(created));

  return Promise.resolve({
    created,
    saved: Promise.all([saved, byLocation, ...byUser]),
  });
}
