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

    this.forceUpdate();

    onDragEnd(event, location);
  }

  render() {
    const { onDrag, pinColor, locationKey, location } = this.props;

    return (
      <MapView.Marker
        key={`${locationKey}${Date.now()}`}
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
      >
        <MapView.Callout>
          <PinCallout locationKey={locationKey} {...location} />
        </MapView.Callout>
      </MapView.Marker>
    );
  }
}

LocationMarker.defaultProps = {
  location: {
    latitude: 0,
    longitude: 0,
    status: '',
    created: 0,
  },
};

LocationMarker.propTypes = {
  locationKey: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
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
    locationKey: ownProps.locationKey,
    pinColor: getPinColor(location, state),
    location,
    locale: state.i18n.locale,
  };
};

export default connect(mapStateToProps)(LocationMarker);
