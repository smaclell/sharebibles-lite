import {
  Text,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/visits';
import fonts from '../styles/fonts';

const statusIconsSize = 10;

const VisitStatus = ({ status }) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: fonts.normal, marginRight: 5 }}>{status.label}</Text>
    <View style={styles.status_circle}>
      <FontAwesome name={status.icon} size={statusIconsSize} color={'white'} />
    </View>
  </View>
);

VisitStatus.propTypes = {
  status: PropTypes.object.isRequired,
};

export default VisitStatus;
