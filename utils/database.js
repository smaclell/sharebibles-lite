import _ from 'lodash';
import { SecureStore } from 'expo';

export function mergeLocations(local, online) {
  return _.unionWith(local, online, (val1, val2) => val1.key === val2.key);
}

// converts array from local db to app type location object: { key, created, status, resources, longitude, latitude }
export async function convertToLocations(databaseArray) {
  let locations = [];

  for (const location of databaseArray) {
    const { key, createdAt: created, resources, status } = location;
    const { longitude, latitude } = await getCoordinates(key);
    locations.push({ key, created, status, resources, longitude, latitude });
  }

  return locations;
}

export function getCoordinates(key) {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(key)
      .then(result => {
        resolve(JSON.parse(result));
      })
      .catch(reject);
  });
}
