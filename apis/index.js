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

function getGeoFire(path) {
  initialize();

  const ref = firebase.database().ref(path);
  return new GeoFire(ref);
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
    pushed = firebase.database().ref(`locations/${key}`);
  } else {
    pushed = firebase.database().ref('locations').push();
  }

  const created = createLocationObject(pushed.key, null, {}, options.longitude, options.latitude);

  const saved = pushed.set(created);
  const geoPromises = saveGeoData(created, pushed.key, regionKey);

  return {
    created,
    saved: Promise.all([saved, ...geoPromises]),
  };
}
