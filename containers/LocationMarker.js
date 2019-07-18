import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PinCallout from '../components/PinCallout';

class LocationMarker extends PureComponent {
  render() {
    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
        }}
        pinColor={this.props.pinColor}
      >
        <MapView.Callout>
          <PinCallout {...this.props.location} />
        </MapView.Callout>
      </MapView.Marker>
    );
  }
}

LocationMarker.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  pinColor: PropTypes.string.isRequired,
};

const getPinColor = ({ status: key } = {}, { statuses }) => {
  const status = statuses.find((s) => s.key === key);
  if (status) {
    return status.pinColor;
  }

  return 'wheat';
};

const mapStateToProps = (state, ownProps) => {
  const location = state.locations[ownProps.locationKey];

  return {
    pinColor: getPinColor(location, state),
    location,
    locale: state.i18n.locale,
  };
};

export default connect(mapStateToProps)(LocationMarker);
