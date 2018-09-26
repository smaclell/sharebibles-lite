import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';

const families = {
  'font-awesome': FontAwesome,
  entypo: Entypo,
  feather: Feather,
};

const sizes = {
  small: 10,
  medium: 24,
  large: 28,
  extraLarge: 34,
};


const Icon = ({
  size, name, family, colour, style = null,
}) => {
  const Actual = families[family];
  return (
    <Actual size={sizes[size]} name={name} color={colour} style={style} />
  );
};

Icon.propTypes = {
  colour: PropTypes.string,
  family: PropTypes.oneOf(Object.keys(families)),
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)).isRequired,

  // They have abug around support custom proptypes
  // eslint-disable-next-line react/no-typos
  style: ViewPropTypes.style,
};

Icon.defaultProps = {
  family: 'font-awesome',
  colour: 'white',
  style: null,
};

export default Icon;
