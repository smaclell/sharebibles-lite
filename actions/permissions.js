import { SecureStore } from 'expo';
import { Alert } from 'react-native';
import I18n from '../actions/i18n';

export function allowDownload() {
  return async () => {
    const stored = await SecureStore.getItemAsync('allowDownload');
    return stored !== 'false';
  };
}

export function updateAllowDownload(value) {
  return async () => {
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
        },
      );
    });

    await SecureStore.setItemAsync('allowPush', allowed ? 'allowed' : 'denied');
    return allowed;
  };
}
