import Sentry from 'sentry-expo';
import { Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Constants, FileSystem, MailComposer } from 'expo';
import { withNavigation } from 'react-navigation';
import { fetchLocalLocations } from '../apis/database';
import Settings from '../components/Settings';
import { accept, logout } from '../actions/authentication';
import I18n, { updateLocale } from '../actions/i18n';
import { pushLocalLocations } from '../actions/locations';
import emails from '../assets/constants/emails';
import toCsv from '../utils/csv';

const mapStateToProps = state => ({
  ...state.authentication,
  ...state.settings,
  locale: state.i18n.locale, // triggers rerender on local change
  version: Constants.manifest.version,
  connected: state.connected,
});

const exportData = async () => {
  try {
    const locations = await fetchLocalLocations(false);
    const fileName = `${FileSystem.cacheDirectory}/export.${Date.now()}.csv`;
    await FileSystem.writeAsStringAsync(fileName, toCsv(locations));

    await MailComposer.composeAsync({
      subject: I18n.t('export/subject'),
      body: I18n.t('export/body'),
      attachments: [
        fileName,
      ],
    });
  } catch (err) {
    if (err.code === 'E_COMPOSE_UNAVAILABLE') {
      Alert.alert(
        I18n.t('export/error_title'),
        I18n.t('export/no_email_error'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    } else {
      Sentry.captureException(err);
      Alert.alert(
        I18n.t('export/error_title'),
        I18n.t('export/generic_error', { email: emails.feedback }),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }
  }
};

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

const mapDispatchToProps = (dispatch, ownProps) => ({
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
  exportData,
  sendFeedback,
  updateLocale: (locale) => {
    ownProps.navigation.setParams({ locale });
    dispatch(updateLocale(locale));
  },
  pushLocations: () => dispatch(pushLocalLocations()),
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
      [
        { text: I18n.t('button/cancel'), onPress() {} },
        { text: I18n.t('button/push_locations'), onPress() { dispatchProps.pushLocations(); } },
      ],
      { cancelable: true },
    );
  };

  return props;
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Settings));
