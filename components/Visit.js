import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { UploadStatus } from '../actions/uploads';
import styles from '../styles/visits';
import fonts from '../styles/fonts';
import uploadStyles from '../styles/upload';
import VisitStatus from './VisitStatus';
import I18n from '../assets/i18n/i18n';

const Visit = ({ created, status, initial, tag, navigate, upload }) => (
  <TouchableOpacity onPress={() => navigate()}>
    <View style={styles.item}>
      <Image source={require('../assets/logo/logo.png')} style={styles.item_image} />
      <View style={{ flex: 1, minWidth: 110, marginRight: 5 }}>
        <Text style={{ fontSize: fonts.large, fontWeight: 'bold' }}>{ initial ? I18n.t('initial/first_visit') : I18n.t('components/follow_up') }</Text>
        {status ? 
          <VisitStatus status={status}/> : 
          <Text style={{ fontSize: fonts.normal }}>{tag }</Text>
        }
        <Text style={{ fontSize: fonts.small }}>{I18n.t('components/last_visited', {visited_time: moment.utc(created).clone().local().fromNow()})}</Text>
      </View>
      <View style={[styles.circle, uploadStyles[upload]]} />
    </View>
  </TouchableOpacity>
);

Visit.propTypes = {
  created: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired,
  status: PropTypes.object,
  initial: PropTypes.bool,
  tag: PropTypes.string,
  upload: PropTypes.oneOf(Object.keys(UploadStatus)).isRequired,
};

Visit.defaultProps = {
  status: null,
  tag: null,
};

export default Visit;