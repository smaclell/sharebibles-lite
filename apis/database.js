import { SQLite, SecureStore } from 'expo';
import Sentry from 'sentry-expo';
import moment from 'moment';
import { pushRef } from './index';
import { convertArrayToLocations, convertToLocation, createLocationObject, saveCoordinates } from '../utils/database';

const DATABASE_VERSION_KEY = 'DATABASE_VERSION_KEY';
const DATABASE_VERSION = '2';

export function openDatabase(databaseName = 'locations.1.db') {
  return SQLite.openDatabase(databaseName);
}

export function executeTransaction(statement, args = null) {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    const completed = (_, result) => resolve(result);
    const failed = (_, err) => {
      Sentry.captureException(err, { extra: { statement } });
      reject(err);
    };

    db.transaction((tx) => {
      tx.executeSql(statement, args, completed, failed);
    });
  });
}

function createDatabases() {
  return executeTransaction(
    'create table if not exists locations (id integer primary key not null, key text, coordinateKey text, createdAt text, resources text, status text, uploaded int, updated int)'
  );
}

export function clearDatabase() {
  return executeTransaction('drop table locations');
}

export function deleteLocation(key) {
  return executeTransaction('delete from locations where key = ?', [key]);
}

export function updateUploadStatus(key, isUploaded) {
  return executeTransaction('update locations set uploaded = ? where key = ?', [isUploaded, key]);
}

export function replaceLocalLocationWithRemote(remoteLocation) {
  const { key, latitude, longitude, updated, status, resources } = remoteLocation;

  saveCoordinates(key, latitude, longitude);

  return executeTransaction('update locations set status = ?, resources = ?, updated = ?, uploaded = 1 where key = ?', [
    status,
    JSON.stringify(resources),
    updated,
    key,
  ]);
}

export async function updateLocalLocation(options, oldLocation) {
  const { key, updated = 0 } = oldLocation;
  const { latitude, longitude, resources, status } = options;

  saveCoordinates(key, latitude, longitude);

  const locationObject = createLocationObject(key, {
    ...oldLocation,
    ...options,
    uploaded: false,
    updated: oldLocation.uploaded ? oldLocation.updated + 1 : oldLocation.updated,
  });

  await executeTransaction('update locations set resources = ?, status = ?, uploaded = 0, updated = ? where key = ?', [
    resources,
    status,
    updated + 1,
    key,
  ]);

  return locationObject;
}

// fetches individual location
export async function fetchLocalLocation(locationKey) {
  const rows = await executeTransaction('select * from locations where key = ?', [locationKey]);
  if (rows.length < 1) {
    return false;
  }
  const location = convertToLocation(rows.item(0));
  return location;
}

// fetch all locations in db
export async function fetchLocalLocations(offlineOnly = false) {
  const query = offlineOnly ? 'select * from locations where uploaded = 0' : 'select * from locations';

  const result = await executeTransaction(query);
  // This is the shape of the data and cannot really be changed
  // eslint-disable-next-line no-underscore-dangle
  return convertArrayToLocations(result.rows._array);
}

export async function addLocalLocation(locationData) {
  const { resources, status = null, latitude, longitude } = locationData;
  const resourcesString = JSON.stringify(resources);
  const { key } = pushRef('locations');
  const locationObject = createLocationObject(key, { ...locationData, uploaded: false });

  // Store the longitude and latitude in secure storage with same locationKey from DB
  saveCoordinates(key, latitude, longitude);

  const createdAt = moment.utc(locationObject.created).toISOString();
  await executeTransaction(
    'insert into locations (key, coordinateKey, createdAt, resources, status, uploaded, updated) values (?, ?, ?, ?, ?, ?, ?)',
    [key, key, createdAt, resourcesString, status, 0, 0]
  );

  return locationObject;
}

export async function createOrUpdateDatabase() {
  const version = await SecureStore.getItemAsync(DATABASE_VERSION_KEY);

  await createDatabases();

  if (version === DATABASE_VERSION) {
    return Promise.resolve();
  }

  const locations = await fetchLocalLocations();

  await clearDatabase();
  await createDatabases();

  const transactions = locations.map((location) => {
    const { key, createdAt, resources, status, uploaded = 0, updated = 0 } = location;

    return executeTransaction(
      'insert into locations (key, coordinateKey, createdAt, resources, status, uploaded, updated) values (?, ?, ?, ?, ?, ?, ?)',
      [key, key, createdAt, JSON.stringify(resources), status, uploaded, updated]
    );
  });

  return Promise.all(transactions).then(() => SecureStore.setItemAsync(DATABASE_VERSION_KEY, DATABASE_VERSION));
}
