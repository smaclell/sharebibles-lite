import moment from 'moment';
import Expo from 'expo';
import * as firebase from 'firebase';
import GeoFire from 'geofire';
import { wrapLatitude, wrapLongitude } from '../utils/geo';

export function initialize() {
  if (firebase.initialized) {
    return;
  }

  firebase.initialized = true;
  firebase.initializeApp(Expo.Constants.manifest.extra.firebase);
}

function getGeoFire(path) {
  initialize();

  const ref = firebase.database().ref(path);
  return new GeoFire(ref);
}

export const GEO_REGION_KEY = 'geofireRegion';

function saveGeoData(created, locationKey, regionKey) {
  const geoKey = `locations--${locationKey}`;
  const geo = [wrapLatitude(created.latitude), wrapLongitude(created.longitude)];

  const geoRegion = getGeoFire(`${GEO_REGION_KEY}/${regionKey}`).set(geoKey, geo);

  return [geoRegion];
}

export function queryGeoData(geoFireKey, position, callback) {
  const query = getGeoFire(geoFireKey).query({
    center: [wrapLatitude(position.latitude), wrapLongitude(position.longitude)],
    radius: 0.5, // This is in KMs
  });

  query.on('key_entered', geoSubKey => callback(geoSubKey.replace(/^(locations?--)/, '')));

  return query;
}

export function fetchLocations({ regionKey, last }) {
  initialize();
  return firebase.database()
    .ref(`regions/${regionKey}/locations`)
    .limitToLast(last)
    .once('value')
    .then(locations => Object.values(locations.val() || {}))
    .catch(() => []);
}

export function fetchLocation(regionKey, locationKey) {
  initialize();
  return firebase.database()
    .ref(`regions/${regionKey}locations/${locationKey}`)
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

  const saved = firebase.database().ref(`regions/${regionKey}/locations`).update(updateKeys);

  return Promise.resolve({ updated, saved });
}

export async function createLocation(regionKey, options) {
  initialize();

  const pushed = firebase.database().ref(`regions/${regionKey}/locations`).push();

  const created = {
    key: pushed.key,
    created: moment.utc().valueOf(),
    status: null,
    resources: {}, // { given: number, needed: number }
    ...options,
  };

  const saved = pushed.set(created);
  const geoPromises = saveGeoData(created, pushed.key, regionKey);

  return {
    created,
    saved: Promise.all([saved, ...geoPromises]),
  };
}
