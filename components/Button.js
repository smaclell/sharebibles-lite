import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../styles/colours';

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colours.blues.accent,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  primaryText: {
    color: colours.white,
  },
  secondary: {
    backgroundColor: colours.transparent,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colours.greys.base,
    paddingHorizontal: 15,
  },
  secondaryText: {
    color: colours.greys.base,
  },
});

const Button = ({
  buttonStyle,
  children,
  type,
  onPress,
  text,
  textStyle,
}) => {
  const textStyleArray = [styles[`${type}Text`], textStyle];

  if (Array.isArray(textStyle)) {
    textStyleArray.push(...textStyle);
  } else {
    textStyleArray.push(textStyle);
  }

  return (
    <TouchableOpacity style={[styles[type], buttonStyle]} onPress={onPress} >
      {text && <Text style={textStyleArray}>{text}</Text>}
      {children}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  buttonStyle: null,
  children: null,
  text: null,
  textStyle: [],
  type: 'primary',
};

Button.propTypes = {
  buttonStyle: ViewPropTypes.style, // eslint-disable-line react/no-typos
  children: PropTypes.object,
  type: PropTypes.oneOf(['primary', 'secondary']),
  text: PropTypes.string,
  textStyle: PropTypes.oneOfType([
    PropTypes.array,
    Text.propTypes.style, // eslint-disable-line react/no-typos
  ]),
  onPress: PropTypes.func.isRequired,
};

export default Button;
