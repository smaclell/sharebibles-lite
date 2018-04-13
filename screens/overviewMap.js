/* eslint react/no-unused-state: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import Sentry from 'sentry-expo';
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as locationActions from '../actions/locations';
import * as overviewActions from '../actions/overview';
import * as positionActions from '../actions/position';
import Icon from '../components/Icon';
import PinCallout from '../components/PinCallout';
import LocationCreation from '../containers/LocationCreation';
import SlideIn from '../components/SlideIn';
import { getCurrentPosition } from '../apis/geo';
import colours from '../styles/colours';
import I18n from '../assets/i18n/i18n';

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
  animatedContainer: {
    position: 'absolute',
    borderRadius: 5,
    width: '98%',
    height: '50%',
    backgroundColor: colours.white,
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
const shortAnimationTime = 400;

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

    this.state = {
      ...this.initialRegion,
      centered: false,
      isReady: false,
      tempLocation: null,
      movingTemp: false,
      mapHeight: 0,
    };
  }

  onMapReady = () => {
    this.setState({ isReady: true });

    // Initially map will be centered, need to wait till map is done setting up
    setTimeout(() => this.setState({ centered: true }), 500);
  }

  // Called when user finishes moving the map on device
  onRegionChangeComplete = ({
    latitude, longitude, latitudeDelta, longitudeDelta,
  }) => {
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

  // Called when user taps current location button
  onLocationPress = async () => {
    if (this.state.centered) return;
    const { location } = await getCurrentPosition(true);
    if (location) {
      this.map.animateToCoordinate(location, animationTime);

      // Wait for animation to finish then set centered
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

  onLongPress = (event) => {
    const coord = event.nativeEvent.coordinate;
    if (!this.state.tempLocation) {
      this.createTempPin(coord);
    }
  }

  onDragStart = (event) => {
    this.setState({ movingTemp: true });
    event.persist();
  }

  onDrag = event => event.persist();

  onDragEnd = (event) => {
    const coord = event.nativeEvent.coordinate;
    this.setState({ movingTemp: false, tempLocation: coord });
    event.persist();
  }

  onLocationCancel = () => {
    this.setState({ tempLocation: null });
  }

  createTempPin = (coord) => {
    this.setState({ tempLocation: coord });
    // Offset is used to calculate where to move the map so the pin is centered in remainder of visible screen
    // Half the screen is visible when options container is visible, so we need to move the map so the pin is at the top quarter
    const offSet = this.state.latitudeDelta / 4;
    const temp = { latitude: coord.latitude - offSet, longitude: coord.longitude };
    this.map.animateToCoordinate(temp, shortAnimationTime);
  }

  saveLocation = async ({ status, resources }) => {
    try {
      const { longitude, latitude } = this.state.tempLocation;
      await this.props.createLocation({
        status,
        longitude,
        latitude,
        resources,
      });
    } catch (err) {
      Sentry.captureException(err, { extra: { status } });

      Alert.alert(
        I18n.t('validation/unknown_error_title'),
        I18n.t('validation/unknown_error_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }
    this.setState({ tempLocation: null });
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
    const { tempLocation, mapHeight } = this.state;
    const iconColour = this.state.centered ? blue : black;
    return (
      <View style={styles.container} onLayout={e => this.setState({ mapHeight: e.nativeEvent.layout.height })}>
        <MapView
          ref={(map) => { this.map = map; }}
          style={styles.map}
          mapType="hybrid"
          showsUserLocation
          showsMyLocationButton={false}
          showsTraffic={false}
          showsIndoors={false}
          showsBuildings={false}
          region={this.state}
          initialRegion={this.state}
          provider="google"
          minZoomLevel={10}
          maxZoomLevel={20}
          onMapReady={this.onMapReady}
          onRegionChange={() => this.setState({ centered: false })}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onUserLocationChange={this.onLocationChange}
          onLongPress={this.onLongPress}
        >
          {locations.map(({ location, pinColor }) => (
            <MapView.Marker
              key={location.key}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
}}
              pinColor={pinColor}
            >
              <MapView.Callout>
                <PinCallout {...location} />
              </MapView.Callout>
            </MapView.Marker>
          ))}
          { tempLocation &&
            <MapView.Marker
              key="tempLocation"
              coordinate={{
                latitude: tempLocation.latitude,
                longitude: tempLocation.longitude,
}}
              pinColor="yellow"
              draggable
              stopPropagation
              onDragStart={this.onDragStart}
              onDrag={this.onDrag}
              onDragEnd={this.onDragEnd}
            />
          }
        </MapView>
        <SlideIn visible={!!tempLocation} style={styles.animatedContainer} containerHeight={mapHeight} endPercentage={0.49}>
          <LocationCreation onLocationCancel={this.onLocationCancel} saveLocation={this.saveLocation} />
        </SlideIn>
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
  createLocation: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  updateMode: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
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
  const { overview: { mode } } = state;
  const locations =
    Object.values(state.locations)
      .filter(x => x);

  return {
    position: state.position,
    mode,
    locations: enrichLocations(state, locations),
    resources: Object.values(state.resources),
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(locationActions, dispatch),
  ...bindActionCreators(overviewActions, dispatch),
  ...bindActionCreators(positionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMap);
