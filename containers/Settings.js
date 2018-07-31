import Sentry from 'sentry-expo';
import { Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Constants, FileSystem, MailComposer } from 'expo';
import { withNavigation } from 'react-navigation';
import { fetchLocalLocations } from '../apis/database';
import Settings from '../components/Settings';
import { logout } from '../actions/authentication';
import I18n, { updateLocale } from '../actions/i18n';
import { pushLocalLocations } from '../actions/locations';
import { requestPushPermission, clearPushPermission } from '../actions/permissions';
import { UploadStatus } from '../actions/uploads';
import emails from '../assets/constants/emails';
import toCsv from '../utils/csv';

function hasPending({ uploads }) {
  const values = Object.values(uploads);
  if (values.length === 0) {
    return false;
  }

  return values.some(v => v === UploadStatus.pending);
}

const mapStateToProps = state => ({
  ...state.authentication,
  ...state.settings,
  locale: state.i18n.locale, // triggers rerender on local change
  version: Constants.manifest.version,
  connected: state.connected,
  canUpload: hasPending(state),
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
  acceptInvite: () => ownProps.navigation.navigate('Invites'),
  exportData,
  sendFeedback,
  updateLocale: (locale) => {
    ownProps.navigation.setParams({ locale });
    dispatch(updateLocale(locale));
  },
  pushLocations: () => dispatch(pushLocalLocations()),
  requestPushPermission: () => dispatch(requestPushPermission()),
  clearPushPermission: () => dispatch(clearPushPermission()),
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

    dispatchProps.requestPushPermission()
      .then(allowed => allowed && dispatchProps.pushLocations());
  };

  return props;
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Settings));
