import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from '../styles/map-screen';
import fonts from '../styles/fonts';

const Callout = ({ created, visits }) => (
  <View style={styles.callout_container}>
    <Image source={require('../assets/logo/logo.png')} style={styles.callout_image} />
    <View style={{ marginBottom: 5 }}>
      <Text style={{ fontSize: fonts.normal }}>Last visited {moment.utc(created).clone().local().fromNow()}</Text>
      <Text style={{ fontSize: fonts.normal }}> {visits} Visit(s) </Text>
    </View>
    <Text style={{ fontSize: fonts.small, color: 'red', fontWeight: 'bold' }}>
      Tap to Visit
    </Text>
  </View>
);

Callout.propTypes = {
  created: PropTypes.number.isRequired,
  visits: PropTypes.number.isRequired,
};

export default Callout;
