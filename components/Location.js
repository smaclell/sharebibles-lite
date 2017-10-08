import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../styles/locations';
import fonts from '../styles/fonts';

const Location = ({ name, created, navigate }) => (
  <TouchableOpacity onPressOut={() => navigate()}>
    <View style={styles.item}>
      <Image source={require('../assets/logo/logo.png')} style={styles.item_image} />
      <View style={{ flex: 1, minWidth: 100, marginRight: 35 }}>
        <Text style={{ fontSize: fonts.large, fontWeight: 'bold' }}>{ name }</Text>
        <Text>Last visited {moment.utc(created).clone().local().fromNow()}</Text>
        <Text style={{ fontSize: fonts.normal, color: 'blue' }}>{ uploaded ? 'Uploaded' : 'Pending' }</Text>
      </View>
      <View style={styles.circle} />
    </View>
  </TouchableOpacity>
);

Location.propTypes = {
  created: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default Location;
