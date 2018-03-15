import { SQLite, SecureStore } from 'expo';
import moment from 'moment';

// HELPER FUNCTIONS
function getCoordinateId(length = 20) {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// DATABASE FUNCTIONS
export function openDatabase(databaseName = 'locations.db') {
  return SQLite.openDatabase(databaseName);
}

export function clearDatabase() {
  return new Promise(function(resolve, reject) {
    const db = openDatabase();
    db.transaction( tx => {
      tx.executeSql('drop table locations', null, resolve(true), reject(false));
    });
  });
}

export async function updateUploadStatus(oldKey, newKey, isUploaded) {
  return new Promise(function(resolve, reject) {
    const completed = (tx, results) => {
      resolve(newKey);
    };
    const error = (tx, err) => {
      reject(err);
    };
    const db = openDatabase();
    db.transaction( tx => {
      tx.executeSql('update locations set uploaded = ?, locationKey = ? where locationKey = ?;', [isUploaded ? 1 : 0, newKey, oldKey], completed, error);
    });
  });
}

// fetches individual location
export function fetchLocalLocation(key) {
  return new Promise(function(resolve, reject) {
    const db = openDatabase();
    db.transaction( tx => {
      tx.executeSql('select * from locations where key = ?;',
        [key],
        null,
        resolve,
        reject,
      );
    });
  });
}

//fetch all locations in db
export function fetchLocalLocations() {
  return new Promise(function(resolve, reject) {
    const db = openDatabase();
    db.transaction( tx => {
      tx.executeSql('select * from locations', null, resolve, reject);
    });
  });
}

export async function addLocalLocation(locationData, regionKey) {
  const { resources, status = null, latitude, longitude } = locationData;
  const resourceString = JSON.stringify(resources);
  const coordinateKey = getCoordinateId();

  // Store the longitude and latitude in secure storage
  //SecureStore.setItemAsync(coordinateKey, JSON.stringify({ latitude, longitude }));

  const createdAt = moment.utc().valueOf()

  return new Promise(function(resolve, reject) {
    const complete = (t, results) => {
      resolve({
        key: coordinateKey,
        created: createdAt,
        status:status,
        resources: {},
        longitude,
        latitude,
      });
    };
    const error = (t, results) => {
      reject(results);
    };
    const db = openDatabase();
    db.transaction( tx => {
      tx.executeSql('insert into locations (locationKey, resources, status, coordinateKey, createdAt, uploaded) values (?, ?, ?, ?, ?, ?)',
        [coordinateKey, resourceString, status, coordinateKey, createdAt, 0],
        complete,
        error,
      );
    });
  });
}
