import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const statusIconsSize = 28;

const container = {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
  margin: 5,
};

const circle = {
  alignItems: 'center',
  borderColor: colours.black,
  borderRadius: 30,
  borderStyle: 'solid',
  borderWidth: 2,
  display: 'flex',
  flex: 0,
  height: 60,
  justifyContent: 'center',
  width: 60,
};

const selected = {
  backgroundColor: colours.black,
};

const normal = {
  backgroundColor: colours.greys.lighter,
};

const text = {
  color: colours.text,
  fontSize: fonts.small,
  margin: 5,
  textAlign: 'center',
};

class Status extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onPressed: PropTypes.func.isRequired,
    selected: PropTypes.bool,
  }

  static defaultProps = {
    selected: false,
  }

  render() {
    return (
      <TouchableOpacity style={container} onPressOut={this.props.onPressed}>
        <View style={[circle, this.props.selected ? selected : normal]}>
          <FontAwesome name={this.props.icon} size={statusIconsSize} color={'white'} />
        </View>
        <Text style={text}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export default Status;