import { SecureStore } from 'expo';
import moment from 'moment';
import { LOCATION_UPLOADED } from '../apis/database';

export function createLocationObject(key, options) {
  const created = moment.utc().valueOf();
  return {
    key,
    created,
    ...options,
  };
}

export function saveCoordinates(key, latitude, longitude) {
  SecureStore.setItemAsync(key, JSON.stringify({ latitude, longitude }));
}

export async function getCoordinates(key) {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(key)
      .then((result) => {
        resolve(JSON.parse(result));
      })
      .catch(reject);
  });
}

export async function convertToLocation(location) {
  const {
    key, createdAt: created, resources, status, uploaded,
  } = location;
  const { longitude, latitude } = await getCoordinates(key);
  return {
    key,
    created,
    status,
    resources,
    longitude,
    latitude,
    uploaded: uploaded === LOCATION_UPLOADED.true,
  };
}

// converts array from local db to app type location object:
// { key, created, status, resources, longitude, latitude }
export function convertArrayToLocations(databaseArray) {
  const promises = databaseArray.map(convertToLocation);

  return Promise.all(promises);
}
