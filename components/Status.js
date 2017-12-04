import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
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

const selected = {
  backgroundColor: colours.black,
};

const normal = {
  backgroundColor: colours.greys.lighter,
};

const text = {
  color: colours.text,
  fontSize: fonts.small,
  marginVertical: 5,
  textAlign: 'center',
};

class Status extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    iconFamily: PropTypes.string.isRequired,
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
          <Icon name={this.props.icon} family={this.props.iconFamily} size="medium" />
        </View>
        <Text style={text}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export default Status;
