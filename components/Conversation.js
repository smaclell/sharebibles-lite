import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../styles/conversations';

const Conversation = ({ name, created, uploaded, navigate }) => (
  <TouchableOpacity onPressOut={() => navigate()}>
    <View style={styles.item}>
      <Image source={require('../assets/logo/logo.png')} style={styles.item_image} />
      <View style={{ marginRight: 35 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ name }</Text>
        <Text>Distributed {moment.utc(created).clone().local().fromNow()}</Text>
        <Text style={{ fontSize: 16, color: uploaded ? 'blue' : undefined }}>{ uploaded ? 'Uploaded' : 'Pending' }</Text>
      </View>
      <View style={styles.circle} />
    </View>
  </TouchableOpacity>
);

Conversation.propTypes = {
  created: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  uploaded: PropTypes.bool.isRequired,
};

export default Conversation;
