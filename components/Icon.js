import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const families = {
  'font-awesome': FontAwesome,
  entypo: Entypo,
};

const sizes = {
  small: 10,
  medium: 24,
  large: 34,
};


const Icon = ({ size, name, family, colour, styles = null }) => {
  const Actual = families[family];
  return (
    <Actual size={sizes[size]} name={name} color={colour} style={styles} />
  );
};

Icon.propTypes = {
  colour: PropTypes.string,
  family: PropTypes.oneOf(Object.keys(families)),
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)).isRequired,
  styles: PropTypes.object,
};

Icon.defaultProps = {
  family: 'font-awesome',
  colour: 'white',
};

export default Icon;
