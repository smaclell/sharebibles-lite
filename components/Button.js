import {
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import color from '../constants/colors';
import fonts from '../styles/fonts';

const container = {
  height: 40,
  width: 250,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.flame,
  margin: 10,
  padding: 10,
};

const text = {
  color: color.text,
  fontSize: fonts.normal,
  fontWeight: 'bold',
};

const Button = ({ children, onClick }) => (
  <TouchableOpacity onPress={onClick} style={container}>
    <Text style={text}>{children}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
