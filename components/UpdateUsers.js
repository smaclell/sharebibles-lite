import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 15,
  },
  imageContainer: {
    alignItems: 'center',
    borderColor: colours.black,
    borderRadius: 70,
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 0,
    height: 70,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 70,
  },
  image: {
    height: 70,
    width: 70,
  },
  text: {
    color: colours.text,
    fontSize: fonts.normal,
    margin: 5,
    textAlign: 'center',
  },
});

const UpdateUsers = ({ show }) => (
  <TouchableOpacity style={styles.container} onPress={show}>
    <View style={styles.imageContainer}>
      <FontAwesome name="people" size={70} color={colours.text} />
    </View>
    <Text style={styles.text}>{I18n.t('components/update_users')}</Text>
  </TouchableOpacity>
);

UpdateUsers.propTypes = {
  show: PropTypes.func.isRequired,
};

export default UpdateUsers;
