import {
  Image,
  Text,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const container = {
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: 10,
};

const imageContainer = {
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
};

const image = {
  height: 70,
  width: 70,
};

const text = {
  color: colours.text,
  fontSize: fonts.normal,
  margin: 5,
  textAlign: 'center',
};

const User = ({ name, imageUrl }) => (
  <View style={container}>
    <View style={imageContainer}>
      <Image style={image} source={{ uri: imageUrl }} />
    </View>
    <Text style={text}>{name}</Text>
  </View>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default User;
