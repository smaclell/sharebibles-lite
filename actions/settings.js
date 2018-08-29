import { Alert } from 'react-native';
import I18n from '../assets/i18n/i18n';
import { pushLocalLocations } from '../actions/locations';
import { requestPushPermission } from '../actions/permissions';

export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export function load(settings) {
  return {
    type: LOAD_SETTINGS,
    settings,
  };
}

export function showPushDialog() {
  return (dispatch, getState) => {
    const { connectivity: { connected } } = getState();

    if (!connected) {
      Alert.alert(
        I18n.t('button/offline'),
        I18n.t('connectivity/action_requires_connection'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
      return;
    }

    dispatch(requestPushPermission())
      .then((allowed) => {
        if (allowed) {
          dispatch(pushLocalLocations());
        }
      });
  };
}
