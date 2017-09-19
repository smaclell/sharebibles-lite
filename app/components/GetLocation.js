/* globals navigator */
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: Import from other PR
const colours = {
  black: 'black',
  text: 'black',
};

const fonts = {
  large: 20,
};

const container = {
  alignItems: 'center',
  flexDirection: 'column',
  margin: 15,
};

const circle = {
  alignItems: 'center',
  borderColor: colours.black,
  borderRadius: 100,
  borderStyle: 'solid',
  borderWidth: 2,
  flex: 0,
  height: 100,
  justifyContent: 'center',
  width: 100,
};

const text = {
  color: colours.text,
  fontSize: fonts.large,
  margin: 5,
  textAlign: 'center',
};

// Using entirely local state/methods to simplify the reducer
class GetLocation extends Component {
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

  getLocation() {
    return this.state.location;
  }

  getIcon() {
    if (this.state.loading) {
      return '...';
    }

    if (!this.state.location) {
      return '?';
    }

    if (this.state.accuracy) {
      return '~';
    }

    return 'X';
  }

  handleStateUpdate() {
    this.props.onLocationChanged(this.state.location);
  }

  updateLocation(accuracy) {
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
        this.updateLocation(false);
      },
      { enableHighAccuracy: accuracy, timeout: 30 * 1000, maximumAge: 10 * 1000 },
    );
  }

  render() {
    const icon = this.getIcon();

    return (
      <TouchableOpacity onPressOut={() => this.updateLocation(true)}>
        <View style={container}>
          <ActivityIndicator size="large" animating={this.state.loading} />
          <View style={[circle, { display: this.state.loading ? 'none' : 'flex' }]}>
            <Text>{icon}</Text>
          </View>
          <Text style={text}>Get Location</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default GetLocation;
