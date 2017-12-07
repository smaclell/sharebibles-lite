/* globals __DEV__ */
import moment from 'moment';
import Expo from 'expo';
import * as firebase from 'firebase';
import GeoFire from 'geofire';
import { ImageStore } from 'react-native';
import CryptoJS from 'crypto-js/core';
import md5 from 'crypto-js/md5';
import pbkdf2 from 'crypto-js/pbkdf2';
import Base64 from 'crypto-js/enc-base64';

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
export const GEO_TEAM_KEY = 'geofireUser';
export const GEO_USER_KEY = 'geofireTeam';

function saveGeoData(created, locationKey, regionKey, creator) {
  const geoKey = `locations--${locationKey}`;
  const geo = [created.latitude, created.longitude];

  const geoRegion = getGeoFire(`${GEO_REGION_KEY}/${regionKey}`).set(geoKey, geo);
  const geoTeam = getGeoFire(`${GEO_TEAM_KEY}/${creator.teamKey}`).set(geoKey, geo);
  const geoUser = getGeoFire(`${GEO_USER_KEY}/${creator.key}`).set(geoKey, geo);

  return [geoRegion, geoTeam, geoUser];
}

export function queryGeoData(geoFireKey, position, callback) {
  const query = getGeoFire(geoFireKey).query({
    center: [position.latitude, position.longitude],
    radius: 0.5,
  });

  query.on('key_entered', geoSubKey => callback(geoSubKey.replace('location--', '')));

  return query;
}

function persist(action) {
  return firebase.auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(action);
}

export function fetchUser(userKey) {
  initialize();
  return firebase.database().ref(`users/${userKey}`).once('value').then(v => v.val());
}

export function signOut() {
  initialize();

  return firebase.auth().signOut();
}

export function restoreSignIn(callback) {
  initialize();

  const completed = firebase.auth().onAuthStateChanged(async (raw) => {
    completed();
    if (!raw) {
      return;
    }

    const user = await fetchUser(raw.uid);
    callback(user);
  });
}

export function signIn(email, password) {
  initialize();

  return persist(() => firebase.auth().signInWithEmailAndPassword(email, password))
    .then(({ uid }) => firebase.database().ref(`users/${uid}`).once('value').then(v => v.val()));
}

// Standardizes the results from crypto into something safe to send
function normalize(wordArray) {
// From uuid-safe
  const EQUAL_END_REGEXP = /=+$/;
  const PLUS_GLOBAL_REGEXP = /\+/g;
  const SLASH_GLOBAL_REGEXP = /\//g;

  return wordArray
    .toString(Base64)
    .replace(EQUAL_END_REGEXP, '')
    .replace(PLUS_GLOBAL_REGEXP, '-')
    .replace(SLASH_GLOBAL_REGEXP, '_');
}

// One way hashing for raw access codes
// A single salt is used overall and does not need to be secured
// It is to prevent using pre computed hashses to break our codes
function hashAccessCode(raw) {
  const salt = 'h-V-U5QmjC60KabrfTEzBykgzEXRaAm20KBzUNeySG5jIRVVKSp5RSBLKwP5eiRYPoq_exCMAKP2GAdLdNbR_A';
  return normalize(pbkdf2(raw, salt, { keySize: 512 / 32, iterations: 1000 }));
}

export async function signUp(name, email, password, accessCode) {
  initialize();

  const hashCode = hashAccessCode(accessCode);

  const { uid: userKey } = await persist(
    firebase.auth().createUserWithEmailAndPassword(email, password),
  );

  await firebase.database().ref(`accessCodes/${hashCode}/userKey`).set(userKey);

  const teamKey = await firebase.database().ref(`accessCodes/${hashCode}/teamKey`).once('value').then(v => v.val());
  const hash = md5(email.trim()).toString(CryptoJS.lib.Hex);
  const imageUrl = `https://gravatar.com/avatar/${hash}.png?s=100&d=mm`;

  const user = {
    key: userKey,
    imageUrl,
    name,
    teamKey,
    accessCode: hashCode,
  };

  await Promise.all([
    firebase.database().ref(`teams/${teamKey}/users/${userKey}`).set(hashCode),
    firebase.database().ref(`users/${userKey}`).set(user),
  ]);

  return firebase.database().ref(`users/${userKey}`).once('value').then(v => v.val());
}

// Currently not used. Will soon be used to send/share an access code
// Access codes can only be used once and expire.
// This is enforced by firebase
export async function createAccessCode(forced) {
  const { uid: userKey } = firebase.auth().currentUser;
  const { teamKey } = (await firebase.database().ref(`users/${userKey}`).once('value')).val();

  const raw = __DEV__ && forced ? forced : normalize(CryptoJS.lib.WordArray.random(120 / 8));

  const hashed = hashAccessCode(raw);

  await firebase.database().ref(`accessCodes/${hashed}`).set({
    teamKey,
    createdBy: userKey,
    created: firebase.database.ServerValue.TIMESTAMP,
  });

  return {
    raw,
    hashed,
  };
}

export function fetchTeam(teamKey) {
  initialize();
  return firebase.database().ref(`teams/${teamKey}`).once('value').then(v => v.val());
}

function fetchVisit(visitKey) {
  initialize();
  return firebase.database()
    .ref(`visits/${visitKey}`)
    .once('value')
    .then(visit => visit.val());
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

async function useOrFetchVisit([visitKey, visit]) {
  if (visit instanceof Object) {
    return visit;
  }

  return fetchVisit(visitKey);
}

export async function fetchVisitsByLocation(locationKey) {
  initialize();

  const x = await firebase.database().ref(`visitsByLocation/${locationKey}/visits`).once('value');
  const raw = await x.val();

  return Object.entries(raw).map(useOrFetchVisit);
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

export async function createLocation(creator, team, options) {
  initialize();

  const pushed = firebase.database().ref('locations').push();

  // If we have an imageUrl, upload it to firebase storage:
  let { imageUrl } = options;
  // Hard code no-go for now until we figure out firebase + base64
  if (!pushed && imageUrl) {
    const fileType = 'jpg';
    const child = `locations/${pushed.key}.${fileType}`;
    /*
    const metadata = {
      contentType: `image/${fileType}`,
    };
    */
    const body = await new Promise((resolve, reject) => {
      ImageStore.getBase64ForTag(imageUrl, resolve, reject);
    });

    const image = await firebase.storage().ref().child(child).putString(body, 'base64');

    imageUrl = image.snapshot.downloadUrl;
  } else {
    imageUrl = null;
  }

  const created = {
    key: pushed.key,
    created: moment.utc().valueOf(),
    latitude: 50,
    longitude: 50,
    address: null,
    status: null,
    resources: {}, // { given: number, needed: number }
    createdBy: creator.key,
    teamKey: creator.teamKey,
    ...options,
    imageUrl,
  };

  const saved = pushed.set(created);
  const geoPromises = saveGeoData(created, pushed.key, team.regionKey, creator);

  return {
    created,
    saved: Promise.all([saved, ...geoPromises]),
  };
}

export function createVisit(locationKey, creator, options) {
  initialize();

  const { visitors: vistorsList, ...extra } = options;
  const visitors = vistorsList.reduce((p, v) => {
    p[v] = v; // eslint-disable-line no-param-reassign
    return p;
  }, {});

  const pushed = firebase.database().ref('visits').push();
  const created = {
    key: pushed.key,
    locationKey,
    created: moment.utc().valueOf(),
    createdBy: creator.key,
    visitors,
    status: null,
    tags: {},
    notes: '',
    teamKey: creator.teamKey,
    ...extra,
  };

  // TODO: use the server timestamp created: firebase.database.ServerValue.TIMESTAMP,

  const saved = pushed.set(created);

  const byLocation = firebase.database().ref(`visitsByLocation/${created.locationKey}/visits`).update({
    [pushed.key]: created,
  });

  const byUser = Object.keys(created.visitors)
    .map(userKey => `visitsByUser/${userKey}/${pushed.key}`)
    .map(path => firebase.database().ref(path).set(created));

  return Promise.resolve({
    created,
    saved: Promise.all([saved, byLocation, ...byUser]),
  });
}
