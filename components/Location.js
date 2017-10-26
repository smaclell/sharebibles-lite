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
import I18n from '../assets/i18n/i18n';


const Location = ({ name, created, navigate, uploaded }) => (
  <TouchableOpacity onPressOut={() => navigate()}>
    <View style={styles.item}>
      <Image source={require('../assets/logo/logo.png')} style={styles.item_image} />
      <View style={{ flex: 1, minWidth: 100, marginRight: 35 }}>
        <Text style={{ fontSize: fonts.large, fontWeight: 'bold' }}>{ name }</Text>
        <Text>{I18n.t('last_visited', { visited_time: moment.utc(created).clone().local().fromNow() })}</Text>
        <Text style={{ fontSize: fonts.normal, color: 'blue' }}>{ uploaded ? I18n.t('components/uploaded') : I18n.t('components/pending') }</Text>
      </View>
      <View style={styles.circle} />
    </View>
  </TouchableOpacity>
);

Location.propTypes = {
  created: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  uploaded: PropTypes.bool,
};

Location.defaultProps = {
  uploaded: true,
};

export default Location;
