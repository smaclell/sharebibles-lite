import {
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import colours from '../styles/colours';

const imageStyle = {
  height: 25,
  width: 25,
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

const DrawerButton = ({ user }) => (
  <View style={containerStyle}>
    <Image style={imageStyle} source={{ uri: user.imageUrl }} />
  </View>
);

DrawerButton.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.users[state.user],
});

export default connect(mapStateToProps, null)(DrawerButton);
