import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colours from '../styles/colours';
import fonts from '../styles/fonts';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'flex-start',
    backgroundColor: colours.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  container_heading: {
    alignItems: 'center',
    backgroundColor: colours.black,
    height: '100%',
    justifyContent: 'center',
    marginRight: 5,
    width: 15,
  },

  container_heading_text: {
    color: colours.white,
    fontSize: fonts.normal,
  },
});

const Section = ({ children, order, style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.container_heading}>
      <Text style={styles.container_heading_text}>{ order }</Text>
    </View>
    { children }
  </View>
);

Section.propTypes = {
  children: PropTypes.element.isRequired,
  order: PropTypes.number.isRequired,
  style: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Section;
