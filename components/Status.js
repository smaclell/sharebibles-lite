import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const container = {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
  margin: 5,
};

const circle = {
  alignItems: 'center',
  borderColor: colours.black,
  borderRadius: 50,
  borderStyle: 'solid',
  borderWidth: 2,
  display: 'flex',
  flex: 0,
  height: 50,
  justifyContent: 'center',
  width: 50,
};

const selectedStyle = {
  backgroundColor: colours.black,
};

const normalStyle = {
  backgroundColor: colours.greys.lighter,
};

const text = {
  color: colours.text,
  fontSize: fonts.small,
  marginVertical: 5,
  textAlign: 'center',
};

const Status = ({
  icon, iconFamily, label, onPressed, selected = false,
}) => (
  <TouchableOpacity style={container} onPressOut={onPressed}>
    <View style={[circle, selected ? selectedStyle : normalStyle]}>
      <Icon name={icon} family={iconFamily} size="medium" />
    </View>
    <Text style={text}>{label}</Text>
  </TouchableOpacity>
);

Status.propTypes = {
  icon: PropTypes.string.isRequired,
  iconFamily: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPressed: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Status.defaultProps = {
  selected: false,
};

export default Status;
