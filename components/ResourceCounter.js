import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const formatIcons = {
  book: 'book',
  document: 'file-text-o',
  audio: 'volume-down',
  app: 'code',
  'sd-card': 'download',
  video: 'film',
  default: 'share-alt',
};

const container = {
  alignItems: 'center',
  flexDirection: 'row',
  margin: 0,
};

const text = {
  color: colours.text,
  fontSize: fonts.normal,
  padding: 10,
  textAlign: 'center',
};

const counter = {
  padding: 5,
};

const fixed = {
  flexGrow: 0,
  flexShrink: 1,
};

// Using entirely local state/methods to simplify the reducer
class ResourceCounter extends Component {
  static propTypes = {
    resourceKey: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    onCountChanged: PropTypes.func.isRequired,
    count: PropTypes.number,
  }

  static defaultProps = {
    count: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      count: props.count || 0,
    };

    this.handleCountChanged = this.handleCountChanged.bind(this);
    this.updateCount = this.updateCount.bind(this);
  }

  handleCountChanged() {
    this.props.onCountChanged({
      count: this.state.count,
      resourceKey: this.props.resourceKey,
    });
  }

  updateCount(delta) {
    this.setState(
      p => ({
        ...p,
        count: p.count + delta,
      }),
      this.handleCountChanged,
    );
  }

  render() {
    const iconName = formatIcons[this.props.format] || formatIcons.default;

    return (
      <View style={container}>
        <FontAwesome name={iconName} size={fonts.large} color={colours.text} />
        <Text style={text}>{this.props.summary}</Text>
        <TouchableOpacity style={fixed} onPressOut={() => this.updateCount(-1)}>
          <FontAwesome name="minus" size={fonts.normal} color={colours.text} />
        </TouchableOpacity>
        <Text style={[text, counter, fixed]}>{this.state.count}</Text>
        <TouchableOpacity style={fixed} onPressOut={() => this.updateCount(1)}>
          <FontAwesome name="plus" size={fonts.normal} color={colours.text} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ResourceCounter;
