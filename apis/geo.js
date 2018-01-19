/* globals navigator */
import Sentry from 'sentry-expo';

// eslint-disable-next-line import/prefer-default-export
export async function getCurrentPosition(accuracy = true) {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords: { latitude, longitude } } = position;
        resolve({
          accuracy,
          error: null,
          location: { latitude, longitude },
        });
      },
      (error) => {
        Sentry.captureException(error, { extra: { accuracy } });
        resolve({
          accuracy,
          error: error.message,
          location: null,
        });
      },
      { enableHighAccuracy: accuracy, timeout: 30 * 1000, maximumAge: 10 * 1000 },
    );
  }).then((result) => {
    if (result.location || !accuracy) {
      return result;
    }

    return getCurrentPosition(false);
  });
}
