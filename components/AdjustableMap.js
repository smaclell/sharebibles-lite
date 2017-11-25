import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import debounce from 'lodash/debounce';

const flex = { flex: 1 };

// Using entirely local state/methods to simplify the reducer
class AdjustableMap extends Component {
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    onLocationChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      latitudeDelta: 0.0000922,
      longitudeDelta: 0.0000421,
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.onRegionChange = debounce(this.onRegionChange, 50);
  }

  onRegionChange = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
    this.setState({ latitude, longitude, latitudeDelta, longitudeDelta });
    this.props.onLocationChanged({ latitude, longitude });
  }

  render() {
    const location = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    };

    const region = {
      ...location,
      ...this.state,
    };

    return (
      <View style={flex}>
        <MapView
          style={flex}
          mapType="hybrid"
          showsUserLocation
          showsMyLocationButton={false}
          showsTraffic={false}
          showsIndoors={false}
          showsBuildings={false}
          provider="google"
          region={region}
          onRegionChange={this.onRegionChange}
        >
          <MapView.Marker coordinate={location} pinColor="green" />
        </MapView>
      </View>
    );
  }
}

export default AdjustableMap;
