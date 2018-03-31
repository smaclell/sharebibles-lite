/* globals __DEV__ */
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Feather, FontAwesome } from '@expo/vector-icons';

import styles from '../styles/maps';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

const relativeTime = time => moment.utc(time).clone().local().fromNow();

const Callout = ({ created, status, resources, uploaded }) => {
  const cloudIcon = uploaded ? 'cloud' : 'cloud-off';
  const statusString = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <View style={styles.callout_container}>
      <View style={[styles.row, { justifyContent: 'flex-end' }]}>
        <Feather name={cloudIcon} size={fonts.large} color={colours.black} />
      </View>

      <View style={[styles.row, { justifyContent: 'space-around', marginVertical: 5 }]}>
        <View style={styles.container}>
          <Text style={styles.statusHeader}>Status</Text>
          <View style={styles.valueContainer}><Text style={styles.value}>{statusString}</Text></View>
        </View>

        { resources && resources.generic_bible &&
        <View style={styles.container}>
          <FontAwesome name="book" size={25} color={colours.black} style={{ marginTop: 5 }}/>
          <View style={[styles.valueContainer, { marginTop: 0 }]}><Text style={styles.value}>{resources.generic_bible.given}</Text></View>
        </View>
        }
      </View>

      <View style={styles.timeContainer}>
        <FontAwesome name="clock-o" size={fonts.normal} color={colours.black} />
        <Text style={{ fontSize: fonts.normal }}>{I18n.t('components/last_visited', { visited_time: relativeTime(created) })}</Text>
      </View>
    </View>
  );
};

Callout.defaultProps = {
  status: 'Unknown',
  resources: null,
  uploaded: false,
};

Callout.propTypes = {
  created: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  resources: PropTypes.object,
  uploaded: PropTypes.bool,
};

export default Callout;
