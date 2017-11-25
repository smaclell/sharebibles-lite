import {
  Text,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';
import styles from '../styles/visits';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const VisitStatus = ({ status }) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: fonts.normal, marginRight: 5 }}>{I18n.t(status.label)}</Text>
    <View style={styles.status_circle}>
      <Icon name={status.icon} family={status.iconFamily} size="small" />
    </View>
  </View>
);

VisitStatus.propTypes = {
  status: PropTypes.object.isRequired,
};

export default VisitStatus;
