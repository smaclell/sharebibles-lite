import { SQLite, SecureStore } from 'expo';
import * as firebase from 'firebase';
import moment from 'moment';
import Sentry from 'sentry-expo';
import { TEAM_KEY, GEO_REGION_KEY } from './index';

// HELPER FUNCTIONS
// function getCoordinateId() {
// return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// }

// DATABASE FUNCTIONS
export function openDatabase(databaseName = 'locations.db') {
  return SQLite.openDatabase(databaseName);
}

export function clearDatabase() {
  return new Promise((resolve, reject) => {
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql('drop table locations', null, resolve(true), reject(false));
    });
  });
}

// NOTE: use 1 and 0 for isUploaded (1 = true, 0 = false)
export function updateUploadStatus(key, isUploaded) {
  return new Promise((resolve, reject) => {
    const completed = () => {
      resolve(true);
    };
    const error = (tx, err) => {
      reject(err);
    };
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql('update locations set uploaded = ? where key = ?',
        [isUploaded, key],
        completed,
        error,
      );
    });
  });
}

// fetches individual location
export function fetchLocalLocation(locationKey) {
  return new Promise((resolve, reject) => {
    const completed = (tx, { rows }) => {
      const { key, resources, status, createdAt, coordinateKey, uploaded } = rows.item(0);
      SecureStore.getItemAsync(coordinateKey).then((coordinates) => {
        const { longitude, latitude } = JSON.parse(coordinates);
        const location = {
          key,
          created: createdAt,
          status,
          resources,
          longitude,
          latitude,
          uploaded,
        };
        resolve(location);
      }).catch(err => Sentry.captureException(err));
    };
    const error = (tx, err) => {
      reject(err);
    };

    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql('select * from locations where key = ?;',
        [locationKey],
        completed,
        error,
      );
    });
  });
}

// fetch all locations in db
export function fetchLocalLocations() {
  return new Promise((resolve, reject) => {
    const complete = (tx, result) => {
      console.log(result);
      resolve(result);
    };
    const error = (tx, err) => {
      reject(err);
    };
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql('select * from locations', null, complete, error);
    });
  });
}

export async function addLocalLocation(locationData, regionKey = GEO_REGION_KEY, team = TEAM_KEY) {
  const { resources, status = null, latitude, longitude } = locationData;
  const resourceString = JSON.stringify(resources);
  const key = firebase.database().ref(`regions/${regionKey}/locations`).push().key;
  const createdAt = moment.utc().valueOf();

  // Store the longitude and latitude in secure storage with same locationKey from DB
  SecureStore.setItemAsync(key, JSON.stringify({ latitude, longitude }));

  return new Promise((resolve, reject) => {
    const complete = () => {
      resolve({
        key,
        created: createdAt,
        status,
        resources: {},
        longitude,
        latitude,
      });
    };
    const error = (t, err) => {
      Sentry.captureException(err);
      reject(err);
    };
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql('insert into locations (key, coordinateKey, createdAt, team, resources, status, uploaded) values (?, ?, ?, ?, ?, ?, ?)',
        [key, key, createdAt, team, resourceString, status, 0],
        complete,
        error,
      );
    });
  });
}
