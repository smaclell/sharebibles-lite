import Sentry from 'sentry-expo';
import { Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import Settings from '../components/Settings';
import { accept, logout } from '../actions/authentication';
import I18n, { updateLocale } from '../actions/i18n';
import emails from '../assets/constants/emails';

const mapStateToProps = state => ({
  locale: state.i18n.locale, // triggers rerender on local change
  version: Constants.manifest.version,
});

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

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  acceptInvite: (invite) => {
    const result = dispatch(accept(invite))
      .then(() => {
        Alert.alert(
          I18n.t('settings/token_title'),
          I18n.t('settings/token_success', { email: emails.sharebibles }),
          [{ text: I18n.t('button/ok'), onPress() {} }],
          { cancelable: false },
        );
      })
      .catch((err) => {
        Sentry.captureException(err);
        Alert.alert(
          I18n.t('settings/token_title'),
          I18n.t('settings/token_error', { email: emails.sharebibles }),
          [{ text: I18n.t('button/ok'), onPress() {} }],
          { cancelable: false },
        );
      });
    return result;
  },
  sendFeedback,
  updateLocale: locale => dispatch(updateLocale(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
