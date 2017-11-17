import {
  Text,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const view = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 5,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colours.greys.lighter,
};

const text = {
  flex: 1,
  color: colours.text,
  fontSize: fonts.normal,
  margin: 5,
  paddingRight: 5,
};

const TextSwitch = ({ children, onChange, value }) => (

  <View style={view}>
    <Text style={text}>{children}</Text>
    <Switch
      onValueChange={onChange}
      value={value}
    />
  </View>

);

TextSwitch.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};


export default TextSwitch;
