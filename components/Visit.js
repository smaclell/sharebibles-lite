import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../styles/visits';
import fonts from '../styles/fonts';

const Visit = ({ created, status, tag, navigate, uploaded }) => (
  <TouchableOpacity onPressOut={() => navigate()}>
    <View style={styles.item}>
      <Image source={require('../assets/logo/logo.png')} style={styles.item_image} />
      <View style={{ flex: 1, minWidth: 100, marginRight: 35 }}>
        <Text style={{ fontSize: fonts.large, fontWeight: 'bold' }}>{ status ? 'First Visit' : 'Follow Up Visit' }</Text>
        <Text>Last visited {moment.utc(created).clone().local().fromNow()}</Text>
        <Text style={{ fontSize: fonts.normal }}>{ status || tag }</Text>
      </View>
      <View style={[styles.circle, uploaded ? styles.uploaded : styles.pending]} />
    </View>
  </TouchableOpacity>
);

Visit.propTypes = {
  created: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired,
  status: PropTypes.string,
  tag: PropTypes.string,
  uploaded: PropTypes.bool,
};

Visit.defaultProps = {
  uploaded: true,
  status: null,
  tag: null,
};

export default Visit;
