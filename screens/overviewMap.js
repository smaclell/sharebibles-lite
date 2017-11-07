import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import PinCallout from '../components/PinCallout';

const OverviewMap = ({ navigation, locations }) => {
  const { navigate } = navigation;
  const { latitude = 37.78825, longitude = -122.4324 } = locations.slice(-1)[0] || {};
  return (
    <MapView
      style={{ flex: 1 }}
      mapType="hybrid"
      showsUserLocation
      showsMyLocationButton
      showsTraffic={false}
      showsIndoors={false}
      showsBuildings={false}
      provider="google"
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421,
      }}
    >
      {locations.map(location => (
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
};

OverviewMap.propTypes = {
  navigation: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
};

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
