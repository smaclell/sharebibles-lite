import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignContent: 'flex-start',
    margin: 10,
  },
  text: {
    flex: 1,
    color: colours.greys.darkest,
    fontSize: fonts.large,
  },
});

const SettingsItem = ({ term, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{I18n.t(term).toUpperCase()}</Text>
  </TouchableOpacity>
);

SettingsItem.propTypes = {
  term: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SettingsItem;
