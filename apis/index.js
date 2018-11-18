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
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => firebase.auth().signInWithCustomToken(token));
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
  return firebase
    .database()
    .ref(ref)
    .push();
}

export function getRef(ref) {
  initialize();
  return firebase.database().ref(ref);
}

export const GEO_REGION_KEY = 'geofireRegion';

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

  query.on('key_entered', (geoSubKey) => callback(geoSubKey));

  return query;
}

export function fetchLocations({ last }) {
  initialize();
  return firebase
    .database()
    .ref('locations')
    .limitToLast(last)
    .once('value')
    .then((locations) => Object.values(locations.val() || {}))
    .catch(() => []);
}

export function fetchLocation(locationKey) {
  initialize();
  return firebase
    .database()
    .ref(`locations/${locationKey}`)
    .once('value')
    .then((location) => location.val());
}

export function updateLocation(newLocation, key) {
  initialize();

  let pushed;
  if (key) {
    pushed = getRef(`locations/${key}`);
  } else {
    pushed = pushRef('locations');
  }

  const saved = pushed.set(newLocation);
  const geoPromises = saveGeoData(newLocation, pushed.key, newLocation.regionKey);

  return {
    saved: Promise.all([saved, ...geoPromises]),
  };
}

export async function createLocation(regionKey, options, key) {
  initialize();

  let pushed;
  if (key) {
    pushed = getRef(`locations/${key}`);
  } else {
    pushed = pushRef('locations');
  }

  const created = createLocationObject(pushed.key, options);
  created.regionKey = regionKey;

  const saved = pushed.set(created);
  const geoPromises = saveGeoData(created, pushed.key, regionKey);

  return {
    created,
    saved: Promise.all([saved, ...geoPromises]),
  };
}
