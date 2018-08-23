/* globals __DEV__ */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
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
  language_container: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 1.5 * fonts.large,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  shown_languages_container: {
    flex: 1,
  },
  languagesOuter: {
    alignSelf: 'stretch',
  },
  languagesInner: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  language: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 10,
  },
  bold: {
    fontWeight: 'bold',
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

class Settings extends Component {
  state = {
    showAllLanguages: false,
  }

  toggleLanguages = () => {
    this.setState(s => ({ ...s, showAllLanguages: !s.showAllLanguages }));
  }

  render = () => {
    const {
      showAllLanguages,
    } = this.state;
    const {
      acceptInvite,
      allowDownload,
      canUpload,
      clearPushPermission,
      enableInvitations,
      exportData,
      logout,
      regionKey,
      resetOnboarding,
      sendFeedback,
      showLocationData,
      showPushDialog,
      updateAllowDownload,
      updateLocale,
      version,
    } = this.props;

    const selected = `locale/${!/^(pt|zh)/.test(I18n.locale) ? I18n.locale.substring(0, 2) : I18n.locale}`;
    const languageStyles = [
      styles.language_container,
      showAllLanguages && styles.shown_languages_container,
    ];

    const languageTitleStyles = [
      SettingsItem.styles.text,
      styles.changeLanguageTitle,
      showAllLanguages && styles.bold,
      showAllLanguages && { marginBottom: 10 },
    ];

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={languageStyles}>
          <TouchableOpacity onPress={this.toggleLanguages}>
            <Text style={languageTitleStyles}>{I18n.t('settings/change_language')}</Text>
          </TouchableOpacity>
          { showAllLanguages && (
            <ScrollView style={styles.languagesOuter} contentContainerStyle={styles.languagesInner}>
              {languages.map(([key, value]) => (
                <TouchableOpacity style={[styles.language]} key={key} onPress={() => updateLocale(key.replace('locale/', ''))}>
                  <Text style={[SettingsItem.styles.text, key === selected && styles.bold]}>{value}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        { !showAllLanguages && (
          <View style={styles.options_container}>
            { regionKey && (
              <View style={SettingsItem.styles.container}>
                <Text style={SettingsItem.styles.text}>{I18n.t('settings/region', { region: regionKey })}</Text>
              </View>
            )}
            { !regionKey && enableInvitations && (
              <SettingsItem term="settings/accept_invites" onPress={acceptInvite} />
            )}
            { regionKey && <SettingsItem term="settings/push_locations" onPress={showPushDialog} disabled={!canUpload} /> }
            { regionKey && <SettingsItem term="settings/location_data" onPress={showLocationData} /> }
            { regionKey && (
              <View style={SettingsItem.styles.container}>
                <Text style={SettingsItem.styles.text}>{I18n.t('settings/allow_download')}</Text>
                <Switch onValueChange={updateAllowDownload} value={allowDownload} />
              </View>
            )}
            <SettingsItem term="settings/export" onPress={exportData} />
            <SettingsItem term="settings/send_feedback" onPress={sendFeedback} />
            { regionKey && <SettingsItem term="settings/logout" onPress={logout} /> }
            { __DEV__ && <SettingsItem term="settings/push_locations_clear" onPress={clearPushPermission} /> }
            { __DEV__ && <SettingsItem term="settings/onboarding_reset" onPress={resetOnboarding} /> }
          </View>
        )}
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
  }
}

Settings.propTypes = {
  acceptInvite: PropTypes.func.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  canUpload: PropTypes.bool.isRequired,
  clearPushPermission: PropTypes.func.isRequired,
  enableInvitations: PropTypes.bool.isRequired,
  exportData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  regionKey: PropTypes.string,
  resetOnboarding: PropTypes.func.isRequired,
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
