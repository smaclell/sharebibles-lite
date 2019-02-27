import Sentry from 'sentry-expo';
import { Alert } from 'react-native';
import i18n from '../assets/i18n/i18n';
import * as apis from '../apis';
import { requestPushPermission } from './permissions';
import { containing } from './regions';
import { failed, pending, uploaded, offline, setUploadingStatus } from './uploads';
import * as database from '../apis/database';
import { LOCATION_UPLOADED } from '../utils/database';
import { setCompleted, COMPLETED_KEYS } from './onboarding';

export const RECIEVE_LOCATION = 'RECIEVE_LOCATION';
function receiveLocation(location) {
  return {
    type: RECIEVE_LOCATION,
    location,
  };
}

export const REMOVE_LOCATION = 'REMOVE_LOCATION';
function removeLocation(locationKey) {
  return {
    type: REMOVE_LOCATION,
    locationKey,
  };
}

export const CLEAR_LOCATIONS = 'CLEAR_LOCATIONS';
export function clearLocations() {
  return {
    type: CLEAR_LOCATIONS,
  };
}

function updateUploadStatus(location, isUploaded) {
  return (dispatch) => {
    const newLocation = { ...location, uploaded: isUploaded };
    dispatch(receiveLocation(newLocation));
    const numericValue = isUploaded ? LOCATION_UPLOADED.true : LOCATION_UPLOADED.false;

    return database.updateUploadStatus(newLocation.key, numericValue);
  };
}

function wrapper(work, location) {
  return async (dispatch) => {
    dispatch(pending(location.key));

    try {
      await work;
      await dispatch(updateUploadStatus(location, true));
      dispatch(uploaded(location.key));
      const uploadedLocation = { ...location, uploaded: true };
      dispatch(receiveLocation(uploadedLocation));
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          locationKey: location.key,
        },
      });

      dispatch(failed(location.key, 'locationData/unknown_error'));
    }
  };
}

// Restores the local local locations, other locations are loaded by the geo query
export function restoreLocalLocations() {
  return async (dispatch) => {
    try {
      const locations = await database.fetchLocalLocations();
      locations.filter(Boolean).forEach((location) => {
        dispatch(receiveLocation(location));

        const process = location.uploaded ? uploaded : offline;
        dispatch(process(location.key));
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  };
}

export function deleteLocalLocation(locationKey) {
  return async (dispatch) => {
    const result = await new Promise((resolve) => {
      Alert.alert(
        i18n.t('location/delete'),
        i18n.t('location/confirmDelete'),
        [
          { text: i18n.t('button/cancel'), style: 'cancel', onPress: () => resolve(false) },
          { text: i18n.t('button/delete'), onPress: () => resolve(true) },
        ],
        {
          cancelable: true,
          onDismiss: () => resolve(false),
        }
      );
    });

    if (result) {
      database
        .deleteLocation(locationKey)
        .then(() => dispatch(removeLocation(locationKey)))
        .catch((err) => {
          Sentry.captureException(err);
        });
    }
  };
}

export function fetchLocation(locationKey) {
  return async (dispatch, getState) => {
    const {
      authentication: { regionKey },
      connected,
    } = getState();
    if (!connected || !regionKey) {
      return;
    }

    try {
      const location = await apis.fetchLocation(locationKey, regionKey);
      if (location) {
        dispatch(receiveLocation({ ...location, uploaded: true }));
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
}

export function fetchAllLocationData(locationKey) {
  return async (dispatch) => {
    await dispatch(fetchLocation(locationKey));
  };
}

function pushLocation(localLocation, locationData, apiCall) {
  return async (dispatch, getState) => {
    const {
      authentication: { regionKey: hasRegion },
      connected,
    } = getState();

    const { key } = localLocation;

    dispatch(offline(key));
    dispatch(receiveLocation(localLocation));
    if (connected && hasRegion) {
      const allowed = await dispatch(requestPushPermission());
      if (!allowed) {
        return;
      }

      const regionKey = dispatch(containing(locationData));
      if (!regionKey) {
        dispatch(failed(key, 'locationData/incorrect_region'));
        return;
      }

      const { created: location, saved, outOfDate } = await apiCall(regionKey, key, localLocation);

      if (outOfDate) {
        Alert.alert(i18n.t('location/errorUpdate'), i18n.t('location/errorUpdateDescription'), [
          {
            text: i18n.t('button/ok'),
            onPress: () => {},
          },
        ]);
      }

      await dispatch(wrapper(saved, location));
    }
  };
}

export function updateLocation(options, oldLocationKey) {
  const { latitude, longitude, resources, status } = options;

  return async (dispatch, getState) => {
    const { locations } = getState();

    const oldLocation = locations[oldLocationKey];

    const locationData = {
      latitude,
      longitude,
      resources,
      status,
    };

    const localLocation = await database.updateLocalLocation(locationData, oldLocation);

    dispatch(pushLocation(localLocation, locationData, apis.updateLocation));
  };
}

export function createLocation(options) {
  const { latitude, longitude, resources, status } = options;

  return async (dispatch, getState) => {
    const {
      onboarding: { hasAddedLocation },
    } = getState();

    if (!hasAddedLocation) {
      dispatch(setCompleted(COMPLETED_KEYS.hasAddedLocation));
    }

    const locationData = {
      latitude,
      longitude,
      resources,
      status,
    };

    const localLocation = await database.addLocalLocation(locationData);
    dispatch(pushLocation(localLocation, locationData, apis.createLocation));
  };
}

export function pushLocalLocations() {
  return async (dispatch, getState) => {
    const {
      authentication: { regionKey: hasRegion },
      connected,
    } = getState();
    if (!connected || !hasRegion) {
      return false;
    }

    const offlineLocations = await database.fetchLocalLocations(true);
    if (!offlineLocations) {
      return false;
    }

    offlineLocations.forEach(({ key }) => dispatch(pending(key)));
    dispatch(setUploadingStatus(true));

    await Promise.all(
      offlineLocations.map(async ({ key, ...options }) => {
        const regionKey = dispatch(containing(options));
        if (!regionKey) {
          dispatch(failed(key, 'locationData/incorrect_region'));
          return;
        }

        const { created: location, saved } = await apis.createLocation(regionKey, key, options);
        dispatch(wrapper(saved, location));
      })
    );

    setTimeout(() => dispatch(setUploadingStatus(false)), 2000);

    return true;
  };
}
