/* eslint react/no-unused-state: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import i18n from '../assets/i18n/i18n';
import * as positionActions from '../actions/position';
import { deleteLocalLocation as deleteLocation } from '../actions/locations';
import { setCompleted, COMPLETED_KEYS } from '../actions/onboarding';
import Icon from '../components/Icon';
import LocationCreation from '../containers/LocationCreation';
import LocationMarker from '../containers/LocationMarker';
import SlideIn from '../components/SlideIn';
import { getCurrentPosition } from '../apis/geo';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

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
    backgroundColor: colours.transparent,
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
  editAreaContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editArea: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: colours.core.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colours.core.white,
    fontSize: fonts.large,
  },
  editAreaFocused: {
    backgroundColor: colours.core.black,
    opacity: 0.7,
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

    this.onPinDragStart = this.onPinDragStart.bind(this);
    this.onPinDrag = this.onPinDrag.bind(this);
    this.onPinDragEnd = this.onPinDragEnd.bind(this);

    const {
      position: { latitude, longitude },
    } = props;

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
      draggingPin: false,
      editingPinKey: null,
      inEdit: false,
      inDelete: false,
      canDeletePin: false,
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
  };

  onMapReady = () => {
    this.setState({ isReady: true });

    // Initially map will be centered, need to wait till map is done setting up
    setTimeout(() => this.setState({ centered: true }), 500);
  };

  // Called when user finishes moving the map on device
  onRegionChangeComplete = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
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
  };

  onCenterLocationPress = async () => {
    if (this.state.centered) return;
    const { location } = await getCurrentPosition(true);
    if (location) {
      this.map.animateToCoordinate(location, animationTime);

      // Wait for animation to finish then set centered
      setTimeout(() => this.setState({ centered: true }), animationTime + 100);
    }
  };

  onAddLocationPress = async () => {
    if (!this.state.tempLocation) {
      const { location } = await getCurrentPosition(true);
      this.createTempPin(location || this.state);
    }
  };

  // Called when the users physical location changes
  onLocationChange = ({ coordinate: coord }) => {
    if (!coord) {
      return;
    }

    if (this.state.centered) {
      this.props.updatePosition(coord.latitude, coord.longitude);
      this.map.animateToCoordinate(coord, animationTime);
    }
  };

  onLongPress = (event) => {
    const coord = event.nativeEvent.coordinate;
    if (!this.state.tempLocation) {
      this.createTempPin(coord);
    }
  };

  onMarkerPress = () => {
    if (!this.props.isOnboarded) {
      this.props.setCompleted();
    }
  };

  onTempPinDragStart = (event) => {
    this.setState({ movingTemp: true });
    event.persist();
  };

  onTempPinDrag = (event) => event.persist();

  onTempPinDragEnd = (event) => {
    const coord = event.nativeEvent.coordinate;
    this.setState({ movingTemp: false, tempLocation: coord });
    event.persist();
  };

  onPinDragStart(event, isUploaded) {
    this.setState({ draggingPin: true, canDeletePin: !isUploaded });
    event.persist();
  }

  onPinDrag(event) {
    const { canDeletePin } = this.state;
    const { position } = event.nativeEvent;
    event.persist();

    if (position.y < this.screenHeight / 8) {
      if (position.x < this.screenWidth / 2 || !canDeletePin) {
        this.setState({ inEdit: true, inDelete: false });
        return;
      }
      this.setState({ inEdit: false, inDelete: true });
      return;
    }

    this.setState({ inEdit: false, inDelete: false });
  }

  onPinDragEnd(event, pinLocation) {
    const { inEdit, inDelete } = this.state;
    const { deleteLocalLocation } = this.props;

    if (inEdit) {
      this.createTempPin({ latitude: pinLocation.latitude, longitude: pinLocation.longitude }, pinLocation.key);
    } else if (inDelete) {
      deleteLocalLocation(pinLocation.key);
    } else {
      // Is there a better way to get the pin to rerender??? Cause this is actually gross...
      this.setState(() => ({ editingPinKey: pinLocation.key }), () => this.setState(() => ({ editingPinKey: null })));
    }

    this.setState(() => ({ draggingPin: false, inEdit: false, inDelete: false, canDeletePin: false }));
    event.persist();
  }

  onFinishCreation = () => {
    this.setState({ tempLocation: null, editingPinKey: null });
  };

  // eslint-disable-next-line arrow-body-style
  getCreationMaxHeight = () => {
    return /^(pt|fr)/.test(this.props.locale) ? 320 : 280;
  };

  screenWidth = Dimensions.get('window').width * (Platform.OS === 'ios' ? 1 : Dimensions.get('window').scale);
  screenHeight = Dimensions.get('window').height * (Platform.OS === 'ios' ? 1 : Dimensions.get('window').scale);

  createTempPin = (coord, editingPinKey) => {
    this.setState(() => ({ tempLocation: coord, editingPinKey }));
    // Offset is used to calculate where to move the map so the pin is centered in remainder of visible screen
    // Half the screen is visible when options container is visible, so we need to move the map so the pin is at the top quarter

    const remainder = Math.min(this.getCreationMaxHeight() / this.state.mapHeight, creationEndPercentage) / 2;

    const offSet = this.state.latitudeDelta * remainder;
    const temp = { latitude: coord.latitude - offSet, longitude: coord.longitude };
    this.map.animateToCoordinate(temp, shortAnimationTime);
  };

  renderLocationMarker = (locationKey) => {
    const { editingPinKey } = this.state;

    return editingPinKey !== locationKey ? (
      <LocationMarker
        key={locationKey}
        locationKey={locationKey}
        onDragStart={this.onPinDragStart}
        onDrag={this.onPinDrag}
        onDragEnd={this.onPinDragEnd}
      />
    ) : null;
  };

  render() {
    const { tempLocation, mapHeight, draggingPin, inEdit, inDelete, canDeletePin, editingPinKey } = this.state;
    const creationMaxHeight = this.getCreationMaxHeight();

    return (
      <View style={styles.container} onLayout={(e) => this.setState({ mapHeight: e.nativeEvent.layout.height })}>
        <NavigationEvents onWillFocus={this.onScreenWillFocus} />
        <MapView
          ref={(map) => {
            this.map = map;
          }}
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
          onMarkerPress={this.onMarkerPress}
        >
          {this.props.locations.map(this.renderLocationMarker)}
          {tempLocation && (
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
              onDragStart={this.onTempPinDragStart}
              onDrag={this.onTempPinDrag}
              onDragEnd={this.onTempPinDragEnd}
            />
          )}
        </MapView>
        <SlideIn
          visible={!!tempLocation}
          style={[styles.animatedContainer, { maxHeight: creationMaxHeight }]}
          fullHeight={creationMaxHeight}
          containerHeight={mapHeight}
          endPercentage={creationEndPercentage}
        >
          <LocationCreation
            onFinish={this.onFinishCreation}
            location={tempLocation}
            editingLocationKey={editingPinKey}
          />
        </SlideIn>
        <TouchableOpacity
          style={[styles.mapButton, styles.centerButton]}
          onPress={this.onCenterLocationPress}
          activeOpacity={0.9}
        >
          <Icon name="crosshair" family="feather" size="extraLarge" colour={colours.white} styles={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mapButton, styles.addButton]}
          onPress={this.onAddLocationPress}
          activeOpacity={0.9}
        >
          <Icon name="plus" family="feather" size="extraLarge" colour={colours.core.white} styles={styles.buttonIcon} />
        </TouchableOpacity>

        {draggingPin && (
          <View style={styles.editAreaContainer}>
            <Text style={inEdit ? [styles.editArea, styles.editAreaFocused] : styles.editArea}>
              {i18n.t('location/edit')}
            </Text>
            {canDeletePin && (
              <Text style={inDelete ? [styles.editArea, styles.editAreaFocused] : styles.editArea}>
                {i18n.t('location/delete')}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  }
}

OverviewMap.propTypes = {
  deleteLocalLocation: PropTypes.func.isRequired,
  isOnboarded: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  setCompleted: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    position,
    locations,
    i18n: { locale },
    onboarding: { isOnboarded },
  } = state;

  return {
    locale, // triggers rerender on local change
    position,
    locations: Object.keys(locations),
    isOnboarded,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(positionActions, dispatch),
  setCompleted: () => dispatch(setCompleted(COMPLETED_KEYS.hasViewedPin)),
  deleteLocalLocation: (locationKey) => dispatch(deleteLocation(locationKey)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewMap);
