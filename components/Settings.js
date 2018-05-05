/* globals __DEV__ */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Picker, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import SettingsItem from '../components/SettingsItem';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';
import list from '../assets/i18n/locales/list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.greys.lightest,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    flex: 0,
  },
  changeLanguagePicker: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 5,
  },
  pickerText: {
    fontSize: fonts.extraSmall,
  },
});

const Settings = (props) => {
  const {
    acceptInvite,
    enableInvitations,
    exportData,
    logout,
    regionKey,
    showPushDialog,
    sendFeedback,
    updateLocale,
    version,
  } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.options_container}>
        { regionKey && (
          <View style={SettingsItem.styles.container}>
            <Text style={SettingsItem.styles.text}>{I18n.t('settings/region', { region: regionKey })}</Text>
          </View>
        )}
        { !regionKey && enableInvitations && (
          <View style={SettingsItem.styles.container}>
            <TextInput
              style={SettingsItem.styles.text}
              autoCorrect={false}
              spellCheck={false}
              onSubmitEditing={e => acceptInvite(e.nativeEvent.text)}
              returnKeyType="send"
              placeholderTextColor={colours.greys.lighter}
              placeholder={I18n.t('settings/token_placeholder')}
            />
          </View>
        )}
        { __DEV__ && (
          <View style={[SettingsItem.styles.container, { minHeight: 3 * fonts.large }]}>
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
        )}
        { regionKey && <SettingsItem term="settings/push_locations" onPress={showPushDialog} /> }
        <SettingsItem term="settings/export" onPress={exportData} />
        <SettingsItem term="settings/send_feedback" onPress={sendFeedback} />
        { regionKey && <SettingsItem term="settings/logout" onPress={logout} /> }
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
  acceptInvite: PropTypes.func.isRequired,
  enableInvitations: PropTypes.bool.isRequired,
  exportData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  regionKey: PropTypes.string,
  sendFeedback: PropTypes.func.isRequired,
  showPushDialog: PropTypes.func.isRequired,
  updateLocale: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
};

Settings.defaultProps = {
  regionKey: null,
};

export default Settings;
