import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { View, StyleSheet } from 'react-native';
import * as overviewActions from '../actions/overview';
import { Toggle } from '../components/Button';
import PinCallout from '../components/PinCallout';
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
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class OverviewMap extends PureComponent {
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
    const { navigation, position, locations } = this.props;
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
          {locations.map(({ location, visits, pinColor }) => (
            <MapView.Marker
              key={location.key}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude }}
              pinColor={pinColor}
            >
              <MapView.Callout onPress={() => navigate('FollowUp', { locationKey: location.key })}>
                <PinCallout {...location} visits={visits} />
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.buttons}>
          {this.renderMode(overviewActions.TEAM_MODE, 'button/show_team')}
          {this.renderMode(overviewActions.USER_MODE, 'button/show_user')}
        </View>
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
  const locations = getLocations(state, mode);

  return {
    position: state.position,
    mode,
    locations: enrichLocations(state, locations),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(overviewActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMap);
