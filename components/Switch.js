import {
  Text,
  Switch,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import fonts from '../styles/fonts';

const TextSwitch = ({ children, onChange, value }) => (

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
    <Text style={{ flex: 1, fontSize: fonts.normal, margin: 2, paddingRight: 5 }}>{children}</Text>
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
