/* globals navigator */
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const container = {
  alignItems: 'center',
  flexDirection: 'column',
  margin: 10,
};

const circle = {
  alignItems: 'center',
  borderColor: colours.black,
  borderRadius: 80,
  borderStyle: 'solid',
  borderWidth: 2,
  flex: 0,
  height: 80,
  justifyContent: 'center',
  width: 80,
};

const text = {
  color: colours.text,
  fontSize: fonts.normal,
  padding: 5,
  textAlign: 'center',
};

const iconSize = 48;

// Using entirely local state/methods to simplify the reducer
class CurrentLocation extends Component {
  static propTypes = {
    onLocationChanged: PropTypes.func,
  }

  static defaultProps = {
    onLocationChanged: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      accuracy: true,
      error: null,
      loading: false,
      location: null,
    };
  }

  getIcon() {
    if (this.state.loading) {
      return <FontAwesome name="refresh" size={iconSize} color={colours.text} />;
    }

    if (this.state.error) {
      return <FontAwesome name="warning" size={iconSize} color={'yellow'} />;
    }

    if (!this.state.location) {
      return <FontAwesome name="map-o" size={iconSize} color={colours.text} />;
    }

    if (this.state.accuracy) {
      return <FontAwesome name="crosshairs" size={iconSize} color={'green'} />;
    }

    return <FontAwesome name="circle-o" size={iconSize} color={'green'} />;
  }

  handleStateUpdate() {
    this.props.onLocationChanged(this.state.location);
  }

  updateCurrentLocation(accuracy) {
    if (this.state.loading) {
      return;
    }

    this.setState(p => ({ ...p, loading: true }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords: { latitude, longitude } } = position;
        this.setState(
          p => ({
            ...p,
            accuracy,
            error: null,
            loading: false,
            location: { latitude, longitude },
          }),
          this.handleStateUpdate,
        );
      },
      (error) => {
        this.setState(
          p => ({
            ...p,
            accuracy,
            error: error.message,
            loading: accuracy,
            location: null,
          }),
          this.handleStateUpdate,
        );
        this.updateCurrentLocation(false);
      },
      { enableHighAccuracy: accuracy, timeout: 30 * 1000, maximumAge: 10 * 1000 },
    );
  }

  render() {
    const icon = this.getIcon();

    return (
      <TouchableOpacity onPressOut={() => this.updateCurrentLocation(true)}>
        <View style={container}>
          <ActivityIndicator size="small" animating={this.state.loading} />
          <View style={[circle, { display: this.state.loading ? 'none' : 'flex' }]}>
            <Text>{icon}</Text>
          </View>
          <Text style={text}>Get Location</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CurrentLocation;
