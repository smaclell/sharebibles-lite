import { SQLite } from 'expo';
import Sentry from 'sentry-expo';
import moment from 'moment';
import { pushRef } from './index';
import { convertArrayToLocations, convertToLocation, createLocationObject, saveCoordinates } from '../utils/database';

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

export function createDatabases() {
  return executeTransaction(
    'create table if not exists locations (id integer primary key not null, key text, coordinateKey text, createdAt text, resources text, status text, uploaded int)'
  );
}

export function clearDatabase() {
  return executeTransaction('drop table locations');
}

export function updateUploadStatus(key, isUploaded) {
  return executeTransaction('update locations set uploaded = ? where key = ?', [isUploaded, key]);
}

export function updateLocalLocation(options) {
  const { resources, status, key } = options;
  // Uncomment this if user is ever able to change location position
  // SecureStore.setItemAsync(key, JSON.parse({ longitude, latitude }));

  return executeTransaction('update locations set resources = ?, status = ?, uploaded = 0 where key = ?', [
    resources,
    status,
    key,
  ]);
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
    'insert into locations (key, coordinateKey, createdAt, resources, status, uploaded) values (?, ?, ?, ?, ?, ?)',
    [key, key, createdAt, resourcesString, status, 0]
  );

  return locationObject;
}
