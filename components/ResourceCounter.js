import { Text, View } from 'react-native';
import Stepper from 'react-native-ui-stepper';
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

class ResourceCounter extends Component {
  static propTypes = {
    format: PropTypes.string.isRequired,
    initialCount: PropTypes.number,
    onCountChanged: PropTypes.func.isRequired,
    resourceKey: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }

  static defaultProps = {
    initialCount: 0,
  }

  onCountChanged = (count) => {
    this.props.onCountChanged({
      count,
      resourceKey: this.props.resourceKey,
    });
  }

  render() {
    const iconName = formatIcons[this.props.format] || formatIcons.default;

    return (
      <View style={container}>
        <FontAwesome name={iconName} size={fonts.large} color={colours.text} />
        <Text style={text}>{this.props.summary}</Text>
        <Stepper
          initialValue={this.props.initialCount}
          displayValue
          maximumValue={999}
          minimumValue={0}
          onValueChange={this.onCountChanged}
          borderColor={colours.core.blue}
          tintColor={colours.core.blue}
          textColor={colours.core.blue}
          borderWidth={2}
        />
      </View>
    );
  }
}

export default ResourceCounter;
