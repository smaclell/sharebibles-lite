import unionWith from 'lodash/unionWith';
import { SecureStore } from 'expo';

export function mergeLocations(local, online) {
  return unionWith(local, online, (val1, val2) => val1.key === val2.key);
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
    latitude
  };
}

// converts array from local db to app type location object: { key, created, status, resources, longitude, latitude }
export async function convertArrayToLocations(databaseArray) {
  let locations = [];
  for (const location of databaseArray) {
    const data = await convertToLocation(location);
    locations.push(data);
  }
  return locations;
}

export async function getCoordinates(key) {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(key)
      .then(result => {
        resolve(JSON.parse(result));
      })
      .catch(reject);
  });
}
