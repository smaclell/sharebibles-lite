/* eslint react/no-unused-state: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
    borderRadius: 5,
    width: '98%',
    height: '50%',
    backgroundColor: colours.white,
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mapButton: {
    position: 'absolute',
    bottom: 20,
    margin: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colours.black,
    backgroundColor: colours.white,
  },
  buttonIcon: {
    backgroundColor: colours.transparent,
  },
  addButton: {
    paddingTop: 14,
    paddingBottom: 13,
    paddingLeft: 17,
    paddingRight: 16,
    left: 0,
  },
  centerButton: {
    paddingTop: 13,
    paddingBottom: 14,
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

const black = 'rgb(0,0,0)';
const blue = 'rgb(12, 128, 252)';

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
      this.createTempPin(this.state);
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
    const iconColour = this.state.centered ? blue : black;

    const creationMaxHeight = this.getCreationMaxHeight();

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
            name="crosshairs"
            family="font-awesome"
            size="large"
            colour={iconColour}
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
            family="font-awesome"
            size="large"
            colour={black}
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
