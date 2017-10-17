import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import PinCallout from '../components/PinCallout';

class MapsView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="map-marker" size={40} color={tintColor} />
    ),
  }

  render() {
    const { navigate } = this.props.navigation;
    const first = this.props.locations.slice(-1)[0] || { latitude: 37.78825, longitude: -122.4324 };
    return (
      <MapView
        style={{ flex: 1 }}
        mapType="hybrid"
        showsUserLocation
        initialRegion={{
          latitude: first.latitude,
          longitude: first.longitude,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421,
        }}
      >
        {this.props.locations.map(location => (
          <MapView.Marker
            key={location.key}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude }}
            pinColor="red"
          >
            <MapView.Callout onPress={() => navigate('Visit', { locationKey: location.key })}>
              <PinCallout {...location} />
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  locations: Object.keys(state.locations)
    .map(x => state.locations[x])
    .map(x => ({ ...x, visits: (state.visits.byLocation[x.key] || []).length })),
});

export default connect(mapStateToProps)(MapsView);
