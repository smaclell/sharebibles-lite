import Expo from 'expo';
import * as firebase from 'firebase';
import GeoFire from 'geofire';
import { wrapLatitude, wrapLongitude } from '../utils/geo';
import { createLocationObject } from '../utils/database';

export function initialize() {
  if (firebase.initialized) {
    return;
  }

  firebase.initialized = true;
  firebase.initializeApp(Expo.Constants.manifest.extra.firebase);
}

export function signIn(token) {
  return firebase.auth().signInWithCustomToken(token);
}

export function signOut() {
  return firebase.auth().signOut();
}

function getGeoFire(path) {
  initialize();

  const ref = firebase.database().ref(path);
  return new GeoFire(ref);
}

export function pushRef(ref) {
  initialize();
  return firebase.database().ref(ref).push();
}

export function getRef(ref) {
  initialize();
  return firebase.database().ref(ref);
}

export const GEO_REGION_KEY = 'geofireRegion';
export const TEAM_KEY = 'test_team';

function saveGeoData(created, locationKey, regionKey) {
  const geoKey = locationKey;
  const geo = [wrapLatitude(created.latitude), wrapLongitude(created.longitude)];

  const geoRegion = getGeoFire(`${GEO_REGION_KEY}/${regionKey}`).set(geoKey, geo);

  return [geoRegion];
}

export function queryGeoData(geoFireKey, position, callback) {
  const query = getGeoFire(geoFireKey).query({
    center: [wrapLatitude(position.latitude), wrapLongitude(position.longitude)],
    radius: 0.5, // This is in KMs
  });

  query.on('key_entered', geoSubKey => callback(geoSubKey));

  return query;
}

export function fetchLocations({ last }) {
  initialize();
  return firebase.database()
    .ref('locations')
    .limitToLast(last)
    .once('value')
    .then(locations => Object.values(locations.val() || {}))
    .catch(() => []);
}

export function fetchLocation(locationKey) {
  initialize();
  return firebase.database()
    .ref(`locations/${locationKey}`)
    .once('value')
    .then(location => location.val());
}

export function updateLocation(regionKey, options) {
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

export async function createLocation(regionKey, options, key) {
  initialize();

  let pushed;
  if (key) {
    pushed = getRef(`locations/${key}`);
  } else {
    pushed = pushRef('locations');
  }

  const created = createLocationObject(pushed.key, { ...options, uploaded: true });

  const saved = pushed.set(created);
  const geoPromises = saveGeoData(created, pushed.key, regionKey);

  return {
    created,
    saved: Promise.all([saved, ...geoPromises]),
  };
}
