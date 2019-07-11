import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import I18n from './i18n';

export const UPDATE_ALLOW_DOWNLOAD = 'UPDATE_ALLOW_DOWNLOAD';
const downloadPermission = (value) => ({
  type: UPDATE_ALLOW_DOWNLOAD,
  value,
});

export function allowDownload() {
  return async (dispatch) => {
    const stored = await SecureStore.getItemAsync('allowDownload');
    const value = stored !== 'false';
    dispatch(downloadPermission(value));
    return value;
  };
}

export function updateAllowDownload(value) {
  return async (dispatch) => {
    dispatch(downloadPermission(value));
    return SecureStore.setItemAsync('allowDownload', String(!!value));
  };
}

export function clearPushPermission() {
  return async () => {
    await SecureStore.setItemAsync('allowPush', 'denied');
  };
}

export function requestPushPermission() {
  return async () => {
    const stored = await SecureStore.getItemAsync('allowPush');
    if (stored === 'allowed') {
      return true;
    }

    const allowed = await new Promise((resolve) => {
      Alert.alert(
        I18n.t('settings/push_locations'),
        I18n.t('settings/push_locations_message'),
        [
          { text: I18n.t('button/cancel'), style: 'cancel', onPress: () => resolve(false) },
          { text: I18n.t('button/push_locations'), onPress: () => resolve(true) },
        ],
        {
          cancelable: true,
          onDismiss: () => resolve(false),
        }
      );
    });

    await SecureStore.setItemAsync('allowPush', allowed ? 'allowed' : 'denied');
    return allowed;
  };
}
