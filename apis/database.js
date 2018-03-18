import { SQLite, SecureStore } from 'expo';
import * as firebase from 'firebase';
import moment from 'moment';
import Sentry from 'sentry-expo';
import { TEAM_KEY, GEO_REGION_KEY } from './index';
import { convertArrayToLocations, convertToLocation } from '../utils/database';

export function createDatabase() {
  const db = openDatabase();
  executeTransaction('create table if not exists locations (id integer primary key not null, key text, coordinateKey text, createdAt int, team text, resources text, status text, uploaded int)');
}

export function openDatabase(databaseName = 'locations.db') {
  return SQLite.openDatabase(databaseName);
}

export function executeTransaction(statement, args, completed, error) {
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(statement, args, completed, error);
  });
}

export function clearDatabase() {
  return new Promise((resolve, reject) => {
    executeTransaction('drop table locations', null, resolve(true), reject(false));
  });
}

// NOTE: use 1 and 0 for isUploaded (1 = true, 0 = false)
export const LOCATION_UPLOADED = Object.freeze({ true: 1, false: 0 });
export function updateUploadStatus(key, isUploaded) {
  return new Promise((resolve, reject) => {
    const completed = () => {
      resolve(true);
    };
    const error = (tx, err) => {
      reject(err);
    };
    executeTransaction('update locations set uploaded = ? where key = ?', [isUploaded, key], completed, error);
  });
}

export function updateLocalLocation(options) {
  return new Promise((resolve, reject) => {
    const completed = () => {
      resolve(true);
    };
    const error = (tx, err) => {
      reject(err);
    };

    const { longitude, latitude, resources, status, key } = options;
    // SecureStore.setItemAsync(key, JSON.parse({ longitude, latitude })); Uncomment this if user is ever able to change location position

    executeTransaction('update locations set resources = ?, status = ?, uploaded = 0 where key = ?', [resources, status, key], completed, error);
  });
}

// fetches individual location
export function fetchLocalLocation(locationKey) {
  return new Promise((resolve, reject) => {
    const completed = (tx, { rows }) => {
      if (rows.length < 1) {
        resolve(false);
        return;
      }
      try {
        const location = convertToLocation(rows.item(0));
        resolve(location);
      } catch (err) {
        reject(err);
      }
    };
    const error = (tx, err) => {
      reject(err);
    };

    executeTransaction('select * from locations where key = ?', [locationKey], completed, error);
  });
}

// fetch all locations in db
export function fetchLocalLocations() {
  return new Promise((resolve, reject) => {
    const completed = async (tx, result) => {
      try {
        const locations = await convertArrayToLocations(result.rows._array);
        resolve(locations);
      } catch (err) {
        reject(err);
      }
    };
    const error = (tx, err) => {
      reject(err);
    };
    executeTransaction('select * from locations', null, completed, error);
  });
}

export async function addLocalLocation(locationData, regionKey = GEO_REGION_KEY, team = TEAM_KEY) {
  const { resources, status = null, latitude, longitude } = locationData;
  const resourcesString = JSON.stringify(resources);
  const key = firebase.database().ref(`regions/${regionKey}/locations`).push().key;
  const created = moment.utc().valueOf();

  // Store the longitude and latitude in secure storage with same locationKey from DB
  SecureStore.setItemAsync(key, JSON.stringify({ latitude, longitude }));

  return new Promise((resolve, reject) => {
    const complete = (tx, result) => {
      resolve({
        key,
        created,
        status,
        resources,
        longitude,
        latitude,
      });
    };
    const error = (tx, err) => {
      Sentry.captureException(err);
      reject(err);
    };
    executeTransaction('insert into locations (key, coordinateKey, createdAt, team, resources, status, uploaded) values (?, ?, ?, ?, ?, ?, ?)',
      [key, key, created, team, resourcesString, status, 0], complete, error);
  });
}

export function getLocalOnlyLocations() {
  return new Promise((resolve, reject) => {
    const completed = async (tx, result) => {
      const locations = await convertArrayToLocations(result.rows._array);
      resolve(locations);
    }
    const error = (tx, err) => {
      reject(err);
    }
    executeTransaction('select * from locations where uploaded = 0', null, completed, error);
  });
}
