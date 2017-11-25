import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AdjustableMap from '../components/AdjustableMap';
import FindLocation from '../components/FindLocation';

// Using entirely local state/methods to simplify the reducer
class CurrentLocation extends PureComponent {
  static propTypes = {
    onLocationChanged: PropTypes.func.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }

  static defaultProps = {
    latitude: null,
    longitude: null,
  }

  onLocationChanged = location => this.props.onLocationChanged(location);

  render() {
    const onLocationChanged = this.onLocationChanged;
    const childProps = { onLocationChanged };

    const { latitude, longitude } = this.props;
    if (!latitude || !longitude) {
      return (
        <FindLocation {...childProps} />
      );
    }

    return (
      <AdjustableMap latitude={latitude} longitude={longitude} {...childProps} />
    );
  }
}

export default CurrentLocation;
