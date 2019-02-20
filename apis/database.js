import { SQLite, SecureStore } from 'expo';
import Sentry from 'sentry-expo';
import moment from 'moment';
import { pushRef } from './index';
import { convertArrayToLocations, convertToLocation, createLocationObject, saveCoordinates } from '../utils/database';

const DATABASE_VERSION_KEY = 'DATABASE_VERSION_KEY';
const DATABASE_VERSION = '2';
const BACKUP_V1 = 'backup_v1';

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

function createDatabases(table = 'locations') {
  return executeTransaction(
    `CREATE TABLE IF NOT EXISTS ${table} (id integer primary key not null, key text, coordinateKey text, createdAt text, resources text, status text, uploaded int, updated int)`
  );
}

export function clearDatabase() {
  return executeTransaction('DROP TABLE locations');
}

export async function backupDatabase() {
  await createDatabases(BACKUP_V1);
  await executeTransaction(`
    DELETE FROM ${BACKUP_V1} WHERE id IN (
      SELECT id FROM locations
    );
  `);
  await executeTransaction(`
    DELETE FROM ${BACKUP_V1} WHERE key IN (
      SELECT key FROM locations
    );
  `);
  await executeTransaction(`
    INSERT INTO ${BACKUP_V1}
    SELECT *
    FROM locations;
  `);

  const before = await executeTransaction('SELECT COUNT(1) as count FROM locations');
  const after = await executeTransaction(`SELECT COUNT(1) as count FROM ${BACKUP_V1}`);
  Sentry.captureMessage(`backed up: ${BACKUP_V1}`, {
    extra: {
      after: after.rows._array[0].count, // eslint-disable-line no-underscore-dangle
      before: before.rows._array[0].count, // eslint-disable-line no-underscore-dangle
    },
  });
}

export async function restoreBackup() {
  await clearDatabase();
  await createDatabases();
  return executeTransaction(`INSERT INTO locations SELECT * FROM ${BACKUP_V1}`);
}

export function deleteLocation(key) {
  return executeTransaction('DELETE FROM locations WHERE key = ?', [key]);
}

export function updateUploadStatus(key, isUploaded) {
  return executeTransaction('UPDATE locations SET uploaded = ? WHERE key = ?', [isUploaded, key]);
}

export function replaceLocalLocationWithRemote(remoteLocation) {
  const { key, latitude, longitude, updated, status, resources } = remoteLocation;

  saveCoordinates(key, latitude, longitude);

  return executeTransaction('UPDATE locations SET status = ?, resources = ?, updated = ?, uploaded = 1 WHERE key = ?', [
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

  await executeTransaction('UPDATE locations SET resources = ?, status = ?, uploaded = 0, updated = ? WHERE key = ?', [
    resources,
    status,
    updated + 1,
    key,
  ]);

  return locationObject;
}

// fetches individual location
export async function fetchLocalLocation(locationKey) {
  const rows = await executeTransaction('SELECT * FROM locations WHERE key = ?', [locationKey]);
  if (rows.length < 1) {
    return false;
  }
  const location = convertToLocation(rows.item(0));
  return location;
}

// fetch all locations in db
export async function fetchLocalLocations(offlineOnly = false) {
  const query = offlineOnly ? 'SELECT * FROM locations WHERE uploaded = 0' : 'SELECT * FROM locations';

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
    'INSERT INTO locations (key, coordinateKey, createdAt, resources, status, uploaded, updated) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [key, key, createdAt, resourcesString, status, 0, 0]
  );

  return locationObject;
}

export async function createOrUpdateDatabase() {
  const version = parseInt((await SecureStore.getItemAsync(DATABASE_VERSION_KEY)) || 0, 10);

  await createDatabases();

  if (version === DATABASE_VERSION) {
    return Promise.resolve();
  }

  try {
    const locations = await fetchLocalLocations();

    await backupDatabase();
    await clearDatabase();
    await createDatabases();

    const transactions = locations.map((location) => {
      const { key, createdAt, resources, status, uploaded = 0, updated = 0 } = location;

      return executeTransaction(
        'INSERT INTO locations (key, coordinateKey, createdAt, resources, status, uploaded, updated) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [key, key, createdAt, JSON.stringify(resources), status, uploaded, updated]
      );
    });

    return Promise.all(transactions).then(() => SecureStore.setItemAsync(DATABASE_VERSION_KEY, DATABASE_VERSION));
  } catch (err) {
    restoreBackup();

    Sentry.captureException(err);
    return Promise.reject(err);
  }
}
