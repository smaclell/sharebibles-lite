import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignContent: 'flex-start',
    alignItems: 'center',
    minHeight: 1.5 * fonts.large,
    margin: 5,
  },
  text: {
    flex: 1,
    color: colours.greys.darkest,
    fontSize: fonts.large,
    flexDirection: 'column',
  },
  disabled: {
    color: colours.greys.base,
  },
});

const SettingsItem = ({ term, onPress, disabled = false }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
    <Text style={[styles.text, disabled && styles.disabled]}>{I18n.t(term)}</Text>
  </TouchableOpacity>
);

SettingsItem.propTypes = {
  term: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SettingsItem.defaultProps = {
  disabled: false,
};

SettingsItem.styles = styles;

export default SettingsItem;
