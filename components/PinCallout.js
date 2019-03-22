import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Feather, FontAwesome } from '@expo/vector-icons';

import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  callout_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
    backgroundColor: colours.white,
  },

  row: {
    marginHorizontal: 5,

    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  col: {
    marginHorizontal: 10,
    width: '100%',
    flexDirection: 'column',
    flex: 1,
  },

  statusHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },

  subHeading: {
    minWidth: '35%',
    marginRight: 5,
    marginBottom: 3,
  },

  value: {
    fontSize: 18,
    marginBottom: 3,
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: colours.greys.lighter,
  },
});

const relativeTime = (time) =>
  moment
    .utc(time)
    .clone()
    .local()
    .fromNow();

const Callout = ({ created, status, resources, uploaded }) => {
  const cloudIcon = uploaded ? 'cloud' : 'cloud-off';
  const statusString = `status/${status}`;
  return (
    <View style={styles.callout_container}>
      <View style={[styles.row, { justifyContent: 'flex-end', width: '100%' }]}>
        <Feather name={cloudIcon} size={fonts.large} color={colours.black} />
      </View>

      <View style={[styles.col, { minHeight: 75 }]}>
        <View style={styles.row}>
          <Text style={[styles.statusHeader, styles.subHeading]}>{I18n.t('pin_callout/status_heading')}:</Text>
          <Text style={styles.value}>{I18n.t(statusString)}</Text>
        </View>

        {resources && resources.generic_bible && (
          <View style={styles.row}>
            <Text style={[styles.statusHeader, styles.subHeading]}>{I18n.t('pin_callout/bibles_heading')}:</Text>
            <Text style={styles.value}>{resources.generic_bible.given}</Text>
          </View>
        )}
      </View>

      <View style={styles.timeContainer}>
        <FontAwesome name="clock-o" size={fonts.normal} color={colours.black} />
        <Text style={{ fontSize: fonts.normal }}>
          {I18n.t('pin_callout/last_visited', { visited_time: relativeTime(created) })}
        </Text>
      </View>
    </View>
  );
};

Callout.defaultProps = {
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
