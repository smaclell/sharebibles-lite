/* eslint react/no-unused-state: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import * as positionActions from '../actions/position';
import Icon from '../components/Icon';
import LocationCreation from '../containers/LocationCreation';
import LocationMarker from '../containers/LocationMarker';
import SlideIn from '../components/SlideIn';
import { getCurrentPosition } from '../apis/geo';
import colours from '../styles/colours';

const creationEndPercentage = 0.49;
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: '50%',
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mapButton: {
    position: 'absolute',
    bottom: 20,
    margin: 20,
    borderRadius: 100,
    backgroundColor: colours.core.blue,
  },
  buttonIcon: {
    backgroundColor: colours.transparent,
  },
  addButton: {
    // Icons are odly sized, so padding on each side must be different to ensure its centered properly
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 17,
    paddingRight: 16,
    left: 0,
  },
  centerButton: {
    // Icons are odly sized, so padding on each side must be different to ensure its centered properly
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 16,
    right: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const initialLatitudeDelta = 0.00000012;
const initialLongitudeDelta = 0.00000006;

const animationTime = 400;
const shortAnimationTime = 200;

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
      mapHeight: 400, // Ideally it would be zero but that results in the slide in coming in from the top
    };
  }

  // Used to check if we just came from a failed item being pressed
  onScreenWillFocus = () => {
    const { navigation } = this.props;
    const coord = navigation.getParam('coord', null);

    if (coord && coord.latitude && coord.longitude) {
      navigation.setParams({ coord: { latitude: null, longitude: null } });
      navigation.closeDrawer();
      this.map.animateToCoordinate(coord, animationTime);
    }
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
      latitudeDelta,
      longitudeDelta,
      centered: false,
    });

    this.props.updatePosition(latitude, longitude);
  }

  onCenterLocationPress = async () => {
    if (this.state.centered) return;
    const { location } = await getCurrentPosition(true);
    if (location) {
      this.map.animateToCoordinate(location, animationTime);

      // Wait for animation to finish then set centered
      setTimeout(() => this.setState({ centered: true }), animationTime + 100);
    }
  }

  onAddLocationPress = async () => {
    if (!this.state.tempLocation) {
      const { location } = await getCurrentPosition(true);
      this.createTempPin(location || this.state);
    }
  }

  // Called when the users physical location changes
  onLocationChange = ({ coordinate: coord }) => {
    if (!coord) {
      return;
    }

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

  getCreationMaxHeight = () => { // eslint-disable-line arrow-body-style
    return /^(pt|fr)/.test(this.props.locale) ? 320 : 280;
  }

  createTempPin = (coord) => {
    this.setState({ tempLocation: coord });
    // Offset is used to calculate where to move the map so the pin is centered in remainder of visible screen
    // Half the screen is visible when options container is visible, so we need to move the map so the pin is at the top quarter

    const remainder = Math.min(this.getCreationMaxHeight() / this.state.mapHeight, creationEndPercentage) / 2;

    const offSet = this.state.latitudeDelta * remainder;
    const temp = { latitude: coord.latitude - offSet, longitude: coord.longitude };
    this.map.animateToCoordinate(temp, shortAnimationTime);
  }

  render() {
    const { tempLocation, mapHeight } = this.state;
    const creationMaxHeight = this.getCreationMaxHeight();

    return (
      <View style={styles.container} onLayout={e => this.setState({ mapHeight: e.nativeEvent.layout.height })}>
<<<<<<< HEAD
<<<<<<< HEAD
        <NavigationEvents
          onWillFocus={this.onScreenWillFocus}
        />
=======
        <Onboarding />
>>>>>>> Initital workings
=======
>>>>>>> Nav working
        <MapView
          ref={(map) => { this.map = map; }}
          style={styles.map}
          mapType="hybrid"
          showsUserLocation
          showsMyLocationButton={false}
          showsTraffic={false}
          showsIndoors={false}
          showsBuildings={false}
          initialRegion={this.initialRegion}
          provider="google"
          minZoomLevel={4}
          maxZoomLevel={20}
          onMapReady={this.onMapReady}
          onRegionChange={() => this.setState({ centered: false })}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onUserLocationChange={this.onLocationChange}
          onLongPress={this.onLongPress}
        >
          {this.props.locations.map(locationKey => (
            <LocationMarker
              key={locationKey}
              locationKey={locationKey}
            />
          ))}
          { tempLocation &&
            <MapView.Marker
              key="tempLocation"
              coordinate={{
                latitude: tempLocation.latitude,
                longitude: tempLocation.longitude,
              }}
              flat={false}
              pinColor="purple"
              opacity={0.9}
              draggable
              stopPropagation
              onDragStart={this.onDragStart}
              onDrag={this.onDrag}
              onDragEnd={this.onDragEnd}
            />
          }
        </MapView>
        <SlideIn visible={!!tempLocation} style={[styles.animatedContainer, { maxHeight: creationMaxHeight }]} fullHeight={creationMaxHeight} containerHeight={mapHeight} endPercentage={creationEndPercentage}>
          <LocationCreation onLocationCancel={this.onLocationCancel} location={tempLocation} />
        </SlideIn>
        <TouchableOpacity
          style={[styles.mapButton, styles.centerButton]}
          onPress={this.onCenterLocationPress}
          activeOpacity={0.9}
        >
          <Icon
            name="crosshair"
            family="feather"
            size="extraLarge"
            colour={colours.white}
            styles={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mapButton, styles.addButton]}
          onPress={this.onAddLocationPress}
          activeOpacity={0.9}
        >
          <Icon
            name="plus"
            family="feather"
            size="extraLarge"
            colour={colours.core.white}
            styles={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

OverviewMap.propTypes = {
  locale: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  updatePosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    position,
    locations,
    i18n: {
      locale,
    },
  } = state;

  return {
    locale, // triggers rerender on local change
    position,
    locations: Object.keys(locations),
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(positionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMap);
