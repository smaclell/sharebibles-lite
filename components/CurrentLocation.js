import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdjustableMap from '../components/AdjustableMap';
import FindLocation from '../components/FindLocation';

// Using entirely local state/methods to simplify the reducer
class CurrentLocation extends Component {
  static propTypes = {
    onLocationChanged: PropTypes.func.isRequired,
  }

  onLocationChanged = (location) => {
    this.props.onLocationChanged(location);
    if (!this.location) {
      this.location = location;
    }
  };

  render() {
    const onLocationChanged = this.onLocationChanged;
    const childProps = { onLocationChanged };

    if (!this.location) {
      return (
        <FindLocation {...childProps} />
      );
    }

    return (
      <AdjustableMap {...this.location} {...childProps} />
    );
  }
}

export default CurrentLocation;
