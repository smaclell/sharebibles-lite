import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdjustableMap from '../components/AdjustableMap';
import FindLocation from '../components/FindLocation';

// Using entirely local state/methods to simplify the reducer
class CurrentLocation extends Component {
  static propTypes = {
    onLocationChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
  }

  onLocationChanged = (location) => {
    this.props.onLocationChanged(location);
    this.setState({ location });
  };

  render() {
    const onLocationChanged = this.onLocationChanged;
    const childProps = { onLocationChanged };

    if (!this.state.location) {
      return (
        <FindLocation {...childProps} />
      );
    }

    return (
      <AdjustableMap {...this.state.location} {...childProps} />
    );
  }
}

export default CurrentLocation;
