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
    bottom: 100,
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

    this.state = { ...this.initialRegion, centered: true, isReady: false };
  }

  componentDidMount() {
    this.props.fetchLocations();
    setTimeout(this.onMapReady, 250);
  }

  onMapReady = () => {
    this.setState({ isReady: true });
  }

  onRegionChange = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
    if (!this.state.isReady) {
      return;
    }

    this.props.updatePosition(latitude, longitude);
    this.setState({
      latitude,
      longitude,
      latitudeDelta: Math.max(latitudeDelta, minLatitudeDelta),
      longitudeDelta: Math.max(longitudeDelta, minLongitudeDelta),
      centered: false,
    });
  }

  onLocationPress = async () => {
    const { location } = await getCurrentPosition(true);
    if (location) {
      this.props.updatePosition(location.latitude, location.longitude);
      this.setState({
        latitude: location.latitude,
        longitude: location.longitude,
        centered: true,
      });
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
          style={styles.map}
          mapType="hybrid"
          showsUserLocation
          showsTraffic={false}
          showsIndoors={false}
          showsBuildings={false}
          provider="google"
          region={this.state}
          initialRegion={this.initialRegion}
          onMapReady={this.onMapReady}
          onRegionChange={this.onRegionChange}
        >
          {locations.map(({ location, pinColor }) => (
            <MapView.Marker
              key={location.key}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude }}
              pinColor={pinColor}
            >
              <MapView.Callout onPress={() => this.goToFollowUp(location.key)}>
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
  fetchLocations: PropTypes.func.isRequired,
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
