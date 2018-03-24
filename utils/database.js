import { SecureStore } from 'expo';
import moment from 'moment';

export function createLocationObject(key, status = null, resources = {}, longitude, latitude) {
  const created = moment.utc().valueOf();
  return {
    key,
    created,
    status,
    resources,
    latitude,
    longitude,
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
  const { key, createdAt: created, resources, status } = location;
  const { longitude, latitude } = await getCoordinates(key);
  return {
    key,
    created,
    status,
    resources,
    longitude,
    latitude,
  };
}

// converts array from local db to app type location object:
// { key, created, status, resources, longitude, latitude }
export async function convertArrayToLocations(databaseArray) {
  const promises = databaseArray.map(location => convertToLocation(location));

  const locations = await Promise.all(promises);
  return locations;
}
