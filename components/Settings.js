/* globals __DEV__ */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Picker, ScrollView, StyleSheet, Text, View, Switch } from 'react-native';
import SettingsItem from '../components/SettingsItem';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';
import list from '../assets/i18n/locales/list';

const languages = Object.entries(list);

// eslint-disable-next-line no-unused-vars
languages.sort(([ka, va], [kb, vb]) => va.localeCompare(vb));

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
  dev: {
    fontWeight: 'bold',
    fontSize: fonts.extraSmall,
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
    allowDownload,
    canUpload,
    clearPushPermission,
    enableInvitations,
    exportData,
    logout,
    regionKey,
    sendFeedback,
    showLocationData,
    showPushDialog,
    updateAllowDownload,
    updateLocale,
    version,
  } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.options_container}>
        <View style={[SettingsItem.styles.container, { minHeight: 1.5 * fonts.large }]}>
          <Text style={[SettingsItem.styles.text, styles.changeLanguageTitle]}>{I18n.t('settings/change_language')}</Text>
          <Picker
            selectedValue={!/^(pt|zh)/.test(I18n.locale) ? I18n.locale.substring(0, 2) : I18n.locale}
            onValueChange={updateLocale}
            style={styles.changeLanguagePicker}
            itemStyle={SettingsItem.styles.text}
            mode="dropdown"
            enabled
          >
            {languages.map(([key, value]) => (
              <Picker.Item key={key} label={value} value={key.replace('locale/', '')} />
            ))}
          </Picker>
        </View>
        { regionKey && (
          <View style={SettingsItem.styles.container}>
            <Text style={SettingsItem.styles.text}>{I18n.t('settings/region', { region: regionKey })}</Text>
          </View>
        )}
        { !regionKey && enableInvitations && (
          <SettingsItem term="settings/accept_invites" onPress={acceptInvite} />
        )}
        { regionKey && <SettingsItem term="settings/push_locations" onPress={showPushDialog} disabled={!canUpload} /> }
        { regionKey && __DEV__ && <SettingsItem term="settings/location_data" onPress={showLocationData} /> }
        { __DEV__ && <SettingsItem term="settings/push_locations_clear" onPress={clearPushPermission} /> }
        { regionKey && (
          <View style={SettingsItem.styles.container}>
            <Text style={SettingsItem.styles.text}>{I18n.t('settings/allow_download')}</Text>
            <Switch onValueChange={updateAllowDownload} value={allowDownload} />
          </View>
        )}
        <SettingsItem term="settings/export" onPress={exportData} />
        <SettingsItem term="settings/send_feedback" onPress={sendFeedback} />
        { regionKey && <SettingsItem term="settings/logout" onPress={logout} /> }
      </View>
      <View style={styles.version_container}>
        { __DEV__ && <Text style={styles.dev}>DEVELOPMENT MODE</Text>}
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
  allowDownload: PropTypes.bool.isRequired,
  canUpload: PropTypes.bool.isRequired,
  clearPushPermission: PropTypes.func.isRequired,
  enableInvitations: PropTypes.bool.isRequired,
  exportData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  regionKey: PropTypes.string,
  sendFeedback: PropTypes.func.isRequired,
  showLocationData: PropTypes.func.isRequired,
  showPushDialog: PropTypes.func.isRequired,
  updateAllowDownload: PropTypes.func.isRequired,
  updateLocale: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
};

Settings.defaultProps = {
  regionKey: null,
};

export default Settings;
