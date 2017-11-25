import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { getCurrentPosition } from '../apis/geo';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const flex = { flex: 1 };

const container = {
  alignItems: 'center',
  flexDirection: 'column',
  margin: 10,
};

const circle = {
  alignItems: 'center',
  borderColor: colours.black,
  borderRadius: 70,
  borderStyle: 'solid',
  borderWidth: 2,
  flex: 0,
  height: 70,
  justifyContent: 'center',
  width: 70,
};

const text = {
  color: colours.text,
  fontSize: fonts.normal,
  padding: 5,
  textAlign: 'center',
};

const iconSize = 40;

// Using entirely local state/methods to simplify the reducer
class FindLocation extends Component {
  static propTypes = {
    onLocationChanged: PropTypes.func.isRequired,
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

  updateCurrentLocation = async () => {
    if (this.state.loading) {
      return;
    }

    this.setState(p => ({ ...p, loading: true }));
    const result = await getCurrentPosition();

    this.setState(
      p => ({
        ...p,
        ...result,
        loading: false,
      }),
      this.handleStateUpdate,
    );
  }

  render() {
    const icon = this.getIcon();

    return (
      <TouchableOpacity style={flex} onPressOut={this.updateCurrentLocation}>
        <View style={container}>
          <ActivityIndicator size="small" animating={this.state.loading} />
          <View style={[circle, { display: this.state.loading ? 'none' : 'flex' }]}>
            <Text>{icon}</Text>
          </View>
          <Text style={text}>{I18n.t('components/get_location')}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FindLocation;
