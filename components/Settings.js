import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, Picker, ScrollView, StyleSheet, Text, View, Linking } from 'react-native';
import SettingsItem from '../components/SettingsItem';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';
import list from '../assets/i18n/locales/list';
import emails from '../assets/constants/emails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.greys.lightest,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 5,
    borderBottomColor: colours.greys.base,
    borderBottomWidth: 1,
    width: '60%',
  },
  options_container: {
    flex: 5,
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  version_container: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 5,
  },
  header: {
    color: colours.text,
    fontSize: fonts.large,
    fontWeight: 'bold',
  },
  logo_container: {
  },
  logo: {
    height: 40,
    width: 40,
  },
  version: {
    color: colours.text,
    fontSize: fonts.small,
  },
  changeLanguageTitle: {
    flex: 1,
  },
  changeLanguagePicker: {
    flex: 1,
    margin: 0,
  },
  pickerText: {
    fontSize: fonts.extraSmall,
  },
});

const Settings = (props) => {
  const { logout, updateLocale, version } = props;

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.options_container}>
        <View style={SettingsItem.styles.container}>
          <Text style={[SettingsItem.styles.text, styles.changeLanguageTitle]}>{I18n.t('settings/change_language')}</Text>
          <Picker
            selectedValue={I18n.locale.substring(0, 2)}
            onValueChange={updateLocale}
            style={styles.changeLanguagePicker}
            itemStyle={SettingsItem.styles.text}
            mode="dropdown"
            enabled
          >
            {Object.entries(list).map(([key, value]) => (
              <Picker.Item key={key} label={value} value={key.replace('locale/', '')} />
            ))}
          </Picker>
        </View>
        <SettingsItem term="settings/send_feedback" onPress={sendFeedback} />
        <SettingsItem term="settings/logout" onPress={logout} />
      </View>
      <View style={styles.version_container}>
        <View style={styles.logo_container}>
          <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.header}> {I18n.t('title/share_bibles')} </Text>
        <Text style={styles.version}>{version}</Text>
      </View>
    </ScrollView>
  );
};

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
  updateLocale: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
};

export default Settings;
