import { NetInfo } from 'react-native';
import { SecureStore } from 'expo';
import { clearLocations, restoreLocalLocations } from './locations';

export const SET_CONNECTED = 'SET_CONNECTED';
export function setConnected(connected) {
  return {
    type: SET_CONNECTED,
    connected,
  };
}

export const SET_MODE = 'SET_MODE';
export function setMode(isOfflineOnly) {
  return {
    type: SET_MODE,
    isOfflineOnly,
  };
}

function update(info) {
  return (dispatch) => {
    if (['none', 'unknown'].includes(info.type)) {
      dispatch(setConnected(false));
    }

    if (['wifi', 'cellular', 'ethernet'].includes(info.type)) {
      dispatch(setConnected(true));
    }
  };
}

export const OFFLINE_ONLY_KEY = 'isOfflineOnly';
export function updateMode(isOfflineOnly) {
  return async (dispatch) => {
    await SecureStore.setItemAsync(OFFLINE_ONLY_KEY, isOfflineOnly.toString());
    dispatch(setMode(isOfflineOnly));

    if (isOfflineOnly) {
      dispatch(clearLocations());
      dispatch(restoreLocalLocations());
    }
  };
}

export function setup() {
  return async (dispatch) => {
    NetInfo.addEventListener(
      'connectionChange',
      info => dispatch(update(info)),
    );

    NetInfo.getConnectionInfo().then(info => dispatch(update(info)));

    let isOfflineOnly = await SecureStore.getItemAsync(OFFLINE_ONLY_KEY);
    if (isOfflineOnly === null) {
      await SecureStore.setItemAsync(OFFLINE_ONLY_KEY, 'false');
      isOfflineOnly = 'false';
    }
    dispatch(setMode(isOfflineOnly === 'true'));
  };
}
