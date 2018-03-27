import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as locationActions from '../actions/locations';
import * as overviewActions from '../actions/overview';
import * as positionActions from '../actions/position';
import Icon from '../components/Icon';
import PinCallout from '../components/PinCallout';
import { getCurrentPosition } from '../apis/geo';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  locationButton: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(3, 3, 3, 0.4)',
    backgroundColor: 'rgba(228, 229, 227, 1)',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const initialLatitudeDelta = 0.0012;
const initialLongitudeDelta = 0.0006;

const minLatitudeDelta = initialLatitudeDelta / 2;
const minLongitudeDelta = initialLongitudeDelta / 2;

const animationTime = 800;

const black = 'rgb(0,0,0)';
const blue = 'rgb(12, 128, 252)';
const backgroundColor = 'rgba(0,0,0,0)';

class OverviewMap extends PureComponent {
  constructor(props) {
    super(props);

    const { position: { latitude, longitude } } = props;
    this.initialRegion = {
      latitude,
      longitude,
      latitudeDelta: initialLatitudeDelta,
      longitudeDelta: initialLongitudeDelta,
    };

    this.state = { ...this.initialRegion, centered: false, isReady: false };
  }

  onMapReady = () => {
    this.setState({ isReady: true });
    setTimeout(() => this.setState({ centered: true }), 2000);
  }

  // Called when user finishes moving the map on device
  onRegionChangeComplete = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
    if (!this.state.isReady) {
      return;
    }

    this.setState({
      latitude,
      longitude,
      latitudeDelta: Math.max(latitudeDelta, minLatitudeDelta),
      longitudeDelta: Math.max(longitudeDelta, minLongitudeDelta),
      centered: false,
    });

    this.props.updatePosition(latitude, longitude);
  }

  onLocationPress = async () => {
    if (this.state.centered) return;
    const { location } = await getCurrentPosition(true);
    if (location) {
      this.map.animateToCoordinate(location, animationTime);

      //Wait for animation to finish then set centered
      setTimeout(() => this.setState({ centered: true }), animationTime + 100);
    }
  }

  // Called when the users physical location changes
  onLocationChange = (coord) => {
    if (this.state.centered) {
      this.props.updatePosition(coord.latitude, coord.longitude);
      this.map.animateToCoordinate(coord, animationTime);
    }
  }

  goToFollowUp = debounce(
    locationKey => this.innerFollowUp(locationKey),
    500,
    { leading: true, trailing: false },
  );

  innerFollowUp = (locationKey) => {
    const { navigation: { navigate, state: { routeName } } } = this.props;
    if (routeName === 'OverviewMap') {
      navigate('FollowUp', { locationKey });
    }
  };

  render() {
    const { locations } = this.props;
    const iconColour = this.state.centered ? blue : black;
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          style={styles.map}
          mapType="hybrid"
          showsUserLocation
          showsMyLocationButton={false}
          showsTraffic={false}
          showsIndoors={false}
          showsBuildings={false}
          provider="google"
          initialRegion={this.state}
          onMapReady={this.onMapReady}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onUserLocationChange={this.onLocationChange}
        >
          {locations.map(({ location, pinColor }) => (
            <MapView.Marker
              key={location.key}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude }}
              pinColor={pinColor}
            >
              <MapView.Callout>
                <PinCallout {...location} />
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={this.onLocationPress}
          activeOpacity={0.9}
        >
          <Icon
            name="crosshairs"
            family="font-awesome"
            size="large"
            colour={iconColour}
            styles={{ backgroundColor }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

OverviewMap.propTypes = {
  locations: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  updateMode: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
};

const locationColor = (location, statuses) => {
  const status = statuses.find(s => (s.key === location.status));
  if (status) { return status.pinColor; }

  return 'wheat';
};

function enrichLocations({ statuses }, locations) {
  return Object.values(locations).map(location => ({
    location,
    pinColor: locationColor(location, statuses),
  }));
}

const mapStateToProps = (state) => {
  const mode = state.overview.mode;
  const locations =
    Object.values(state.locations)
      .filter(x => x);

  return {
    position: state.position,
    mode,
    locations: enrichLocations(state, locations),
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(locationActions, dispatch),
  ...bindActionCreators(overviewActions, dispatch),
  ...bindActionCreators(positionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMap);
