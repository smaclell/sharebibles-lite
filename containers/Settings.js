import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Alert, Linking } from 'react-native';
import Settings from '../components/Settings';
import { updateLocale } from '../actions/i18n';
import { pushLocalLocations } from '../actions/locations';

import I18n from '../assets/i18n/i18n';
import emails from '../assets/constants/emails';

const sendFeedback = () => {
  Linking.canOpenURL(`mailto:${emails.feedback}`)
    .then((supported) => {
      if (supported) {
        const subject = I18n.t('feedback/feedback_subject');
        return Linking.openURL(`mailto:${emails.feedback}?subject=${subject}`);
      }
      return null;
    })
    .catch(() => (
      Alert.alert(
        I18n.t('feedback/feedback_title'),
        I18n.t('feedback/feedback_error', { email: emails.feedback }),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      )
    ));
};

const mapStateToProps = state => ({
  locale: state.i18n.locale, // triggers rerender on local change
  version: Constants.manifest.version,
  connected: state.connected,
});

const mapDispatchToProps = dispatch => ({
  logout: () => Promise.resolve(),
  updateLocale: locale => dispatch(updateLocale(locale)),
  pushLocations: () => dispatch(pushLocalLocations()),
  sendFeedback,
});

const mergeProps = (stateProps, dispatchProps) => {
  const props = Object.assign({}, stateProps, dispatchProps);

  props.showPushDialog = () => {
    if (!stateProps.connected) {
      Alert.alert(
        I18n.t('button/offline'),
        I18n.t('connectivity/action_requires_connection'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
      return;
    }
    Alert.alert(
      I18n.t('settings/push_locations'),
      I18n.t('settings/push_locations_message'),
      [{ text: I18n.t('button/cancel'), onPress() {} }, { text: I18n.t('button/push_locations'), onPress() { dispatchProps.pushLocations(); } }],
      { cancelable: true },
    );
  };

  return props;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Settings);
