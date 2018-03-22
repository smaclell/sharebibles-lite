import { SecureStore } from 'expo';

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

// converts array from local db to app type location object: { key, created, status, resources, longitude, latitude }
export async function convertArrayToLocations(databaseArray) {
  let locations = [];
  for (const location of databaseArray) {
    const data = await convertToLocation(location);
    locations.push(data);
  }
  return locations;
}
