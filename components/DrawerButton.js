import {
  View,
} from 'react-native';
import React from 'react';
import colours from '../styles/colours';

const imageStyle = {
  height: 25,
  width: 25,
  backgroundColor: 'pink',
};

const containerStyle = {
  alignItems: 'center',
  borderColor: colours.black,
  borderRadius: 25,
  borderStyle: 'solid',
  borderWidth: 1,
  flex: 0,
  height: 25,
  justifyContent: 'center',
  overflow: 'hidden',
  width: 25,
};

const DrawerButton = () => (
  <View style={containerStyle}>
    <View style={imageStyle} />
  </View>
);

DrawerButton.propTypes = {
};

export default DrawerButton;
