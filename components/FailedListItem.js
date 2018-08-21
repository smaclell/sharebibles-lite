import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../assets/i18n/i18n';
import fonts from '../styles/fonts';
import colours from '../styles/colours';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 35,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: colours.black,
  },
  text: {
    fontSize: fonts.normal,
    color: colours.black,
  },
  error: {
    color: colours.reds.base,
    paddingTop: 5,
  },
});

const FailedListItem = ({ item: { error, key, location: { latitude, longitude } }, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(longitude, latitude)} key={key}>
    <Text style={styles.text}>{I18n.t('locations/latitude', { value: latitude.toFixed(5) })}</Text>
    <Text style={styles.text}>{I18n.t('locations/longitude', { value: longitude.toFixed(5) })}</Text>
    <Text style={styles.error}>{error ? I18n.t(error) : I18n.t('locations/unknown_error') }</Text>
  </TouchableOpacity>
);

FailedListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FailedListItem;
