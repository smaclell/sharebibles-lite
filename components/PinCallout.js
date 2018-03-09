/* globals __DEV__ */
import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from '../styles/maps';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';


const relativeTime = time => moment.utc(time).clone().local().fromNow();

const Callout = ({ created }) => (
  <View style={styles.callout_container}>
    { __DEV__ && <Image source={require('../assets/logo/logo.png')} style={styles.callout_image} /> }
    <View style={{ marginBottom: 5 }}>
      <Text style={{ fontSize: fonts.normal }}>{I18n.t('components/last_visited', { visited_time: relativeTime(created) })}</Text>
    </View>
    <Text style={{ fontSize: fonts.small, color: 'red', fontWeight: 'bold' }}>
      {I18n.t('components/tap_to_visit')}
    </Text>
  </View>
);

Callout.propTypes = {
  created: PropTypes.number.isRequired,
};

export default Callout;
