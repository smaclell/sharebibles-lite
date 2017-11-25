import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { View, StyleSheet } from 'react-native';
import PinCallout from '../components/PinCallout';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const OverviewMap = ({ navigation, position, locations }) => {
  const { navigate } = navigation;
  const { latitude, longitude } = position;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
    </View>
  );
};

OverviewMap.propTypes = {
  locations: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

const locationColor = (location, statuses) => {
  const status = statuses.find(s => (s.key === location.status));
  if (status) { return status.pinColor; }

  return 'wheat';
};

const mapStateToProps = state => ({
  position: state.position,
  locations: Object.keys(state.locations)
    .map(x => state.locations[x])
    .map(x => ({
      ...x,
      visits: (state.visits.byLocation[x.key] || []).length,
      pinColor: locationColor(x, state.statuses),
    })),
});

export default connect(mapStateToProps)(OverviewMap);
