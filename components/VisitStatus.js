import {
  Text,
  View,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/visits';
import fonts from '../styles/fonts';
import { FontAwesome } from '@expo/vector-icons';

const statusIconsSize = 10;

const VisitStatus = ({ status }) => (
  <View style={{flexDirection: 'row'}}>
    <View style={styles.status_circle}>
      <FontAwesome name={status.icon} size={statusIconsSize} color={'white'} />
    </View>
    <Text style={{ fontSize: fonts.normal, marginLeft: 5 }}>{status.label}</Text>
  </View>
);

VisitStatus.propTypes = {
  status: PropTypes.object.isRequired,
};

export default VisitStatus;
