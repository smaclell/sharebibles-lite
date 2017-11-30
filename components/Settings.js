import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import SettingsItem from '../components/SettingsItem';
import User from '../components/User';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.greys.lightest,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user_container: {
    flex: 0,
    padding: 24,
  },
  options_container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  version_container: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  teamName: {
    color: colours.text,
    fontSize: fonts.large,
  },
  header: {
    color: colours.text,
    fontSize: fonts.header,
    fontWeight: 'bold',
  },
  logo_container: {
  },
  logo: {
    height: 80,
    width: 80,
  },
  version: {
    color: colours.text,
    fontSize: fonts.normal,
  },
});

const Settings = (props) => {
  const { logout, shareInvite, team, user, version } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.user_container}>
        <User {...user} />
        <Text style={styles.teamName}>{team.name}</Text>
      </View>
      <View style={styles.options_container}>
        { user && team && team.owners && !!team.owners[user.key] && <SettingsItem term="settings/invite" onPress={shareInvite} /> }
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
  shareInvite: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
};

export default Settings;
