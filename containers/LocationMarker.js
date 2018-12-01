import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import PinCallout from '../components/PinCallout';

class LocationMarker extends PureComponent {
  constructor(props) {
    super(props);

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragStart(event) {
    const { onDragStart, location } = this.props;

    onDragStart(event, location.uploaded);
  }

  handleDragEnd(event) {
    const { onDragEnd, location } = this.props;

    onDragEnd(event, location);
  }

  render() {
    const { onDrag, pinColor, location } = this.props;

    return (
      <MapView.Marker.Animated
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        pinColor={pinColor}
        stopPropagation
        draggable
        onDragStart={this.handleDragStart}
        onDrag={onDrag}
        onDragEnd={this.handleDragEnd}
        ref={(marker) => {
          this.marker = marker;
        }}
      >
        <MapView.Callout>
          <PinCallout {...location} />
        </MapView.Callout>
      </MapView.Marker.Animated>
    );
  }
}

LocationMarker.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  pinColor: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
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
