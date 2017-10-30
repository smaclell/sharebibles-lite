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

  const { uid: userKey } = await firebase.auth().createUserWithEmailAndPassword(email, password);

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

  const raw = __DEV__ && forced ? forced : normalize(CryptoJS.lib.WordArray.random(192 / 8));

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

export async function createLocation(creator, options) {
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
    name: 'Anything', // TODO: Remove the name
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
    imageUrl,
  };

  const saved = pushed.set(created);
  const geo = getGeoFire().set(`locations--${pushed.key}`, [created.latitude, created.longitude]);

  return {
    created,
    saved: Promise.all([saved, geo]),
  };
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
