import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as overviewActions from '../actions/overview';
import * as positionActions from '../actions/position';
import { Toggle } from '../components/Button';
import Icon from '../components/Icon';
import PinCallout from '../components/PinCallout';
import I18n from '../assets/i18n/i18n';
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
  buttons: {
    position: 'absolute',
    top: 0,
    flex: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    flexDirection: 'row',
  },
  button: {
    margin: 5,
  },
  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 6,
    paddingLeft: 6,
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

  renderMode = (mode, translation) => (
    <Toggle
      key={mode}
      style={styles.button}
      selected={this.props.mode === mode}
      onClick={() => this.props.updateMode(mode)}
    >
      {I18n.t(translation)}
    </Toggle>
  )

  render() {
    const { locations } = this.props;

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
          {locations.map(({ location, visits, pinColor }) => (
            <MapView.Marker
              key={location.key}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude }}
              pinColor={pinColor}
            >
              <MapView.Callout onPress={() => this.goToFollowUp(location.key)}>
                <PinCallout {...location} visits={visits} />
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.buttons}>
          {this.renderMode(overviewActions.TEAM_MODE, 'button/show_team')}
          {this.renderMode(overviewActions.USER_MODE, 'button/show_user')}
        </View>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={this.onLocationPress}
          activeOpacity={0.9}
        >
          <Icon
            name="crosshairs"
            family="font-awesome"
            size="large"
            colour={this.state.centered ? 'rgb(12, 128, 252)' : 'rgb(0,0,0)'}
            styles={{ backgroundColor: 'rgba(0,0,0,0)' }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

OverviewMap.propTypes = {
  locations: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
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

function getLocations(state, mode) {
  if (mode === overviewActions.TEAM_MODE) {
    return state.locations.byTeam;
  }

  if (mode === overviewActions.USER_MODE) {
    return state.locations.byUser;
  }

  return {};
}

const noVisits = [];
function enrichLocations({ statuses, visits: { byLocation } }, locations) {
  return Object.values(locations).map(location => ({
    location,
    visits: (byLocation[location.key] || noVisits).length,
    pinColor: locationColor(location, statuses),
  }));
}

const mapStateToProps = (state) => {
  const mode = state.overview.mode;
  const locationKeys = getLocations(state, mode);
  const locations =
    Object.keys(locationKeys)
      .map(locationKey => state.locations.all[locationKey])
      .filter(x => x);

  return {
    position: state.position,
    mode,
    locations: enrichLocations(state, locations),
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(overviewActions, dispatch),
  ...bindActionCreators(positionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMap);
