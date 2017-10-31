import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import PinCallout from '../components/PinCallout';
import I18n from '../assets/i18n/i18n';

class OverviewMap extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: I18n.t('title/map'),
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="map-marker" size={40} color={tintColor} />
    ),
  }

  render() {
    const { navigate } = this.props.navigation;
    const { latitude = 37.78825, longitude = -122.4324 } = this.props.locations.slice(-1)[0] || {};
    return (
      <MapView
        style={{ flex: 1 }}
        mapType="hybrid"
        showsUserLocation
        initialRegion={{
          latitude,
          longitude,
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
            pinColor={location.pinColor}
          >
            <MapView.Callout onPress={() => navigate('FollowUp', { locationKey: location.key })}>
              <PinCallout {...location} />
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}

const locationColor = (location, statuses) => {
  const status = statuses.find(s => (s.key === location.status));
  if (status) { return status.pinColor; }

  return 'wheat';
};

const mapStateToProps = state => ({
  locations: Object.keys(state.locations)
    .map(x => state.locations[x])
    .map(x => ({
      ...x,
      visits: (state.visits.byLocation[x.key] || []).length,
      pinColor: locationColor(x, state.statuses),
    })),
});

export default connect(mapStateToProps)(OverviewMap);
