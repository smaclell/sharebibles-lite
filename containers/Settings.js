import React from 'react';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Alert, Linking } from 'react-native';
import Settings from '../components/Settings';
import { updateLocale } from '../actions/i18n';
import { pushLocalLocations } from '../actions/locations';


import I18n from '../assets/i18n/i18n';
import emails from '../assets/constants/emails';

const SettingsContainer = props => <Settings {...props} />;

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

const showPushLocations = (connected, pushLocations) => {
  if (!connected) {
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
    [{ text: I18n.t('button/cancel'), onPress() {} }, { text: I18n.t('button/push_locations'), onPress() { pushLocations(); } }],
    { cancelable: true },
  );
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
  showPushLocations,
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
