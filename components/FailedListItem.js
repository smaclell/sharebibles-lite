import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
});

const FailedListItem = ({ item }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{I18n.t('locations/latitude', { value: item.latitude.toFixed(5) })}</Text>
    <Text style={styles.text}>{I18n.t('locations/longitude', { value: item.longitude.toFixed(5) })}</Text>
  </View>
);

FailedListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FailedListItem;
