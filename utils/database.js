import { SecureStore } from 'expo';
import moment from 'moment';

// NOTE: use 1 and 0 for isUploaded (1 = true, 0 = false)
export const LOCATION_UPLOADED = Object.freeze({ true: 1, false: 0 });

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
    key, resources, status, uploaded,
  } = location;
  const created = parseInt(location.createdAt);
  const { longitude, latitude } = await getCoordinates(key);
  return {
    key,
    created,
    status,
    resources: JSON.parse(resources),
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
