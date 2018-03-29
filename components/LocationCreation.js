import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../assets/i18n/i18n';

import ChooseStatus from '../containers/ChooseStatus';
import ResourceCounter from '../components/ResourceCounter';
import styles from '../styles/locationCreation';

function createInitialState() {
  return {
    status: 'unknown',
    resources: {},
    tags: {},
  };
}

class LocationCreation extends Component {
  constructor(props) {
    super(props);
    this.state = createInitialState();
  }

  updateStatus = value => this.setState({ status: value })

  updateCount = ({ count, resourceKey }) => {
    this.setState(p => ({
      ...p,
      resources: {
        [resourceKey]: {
          ...p.resources[resourceKey],
          given: count,
        },
      },
    }));
  }


  showResource = (resource) => {
    if (!resource.statuses.includes(this.state.status)) { return null; }

    let count = resource.startCount;
    if (this.state.resources[resource.key]) {
      count = this.state.resources[resource.key].given;
    } else if (count > 0) {
      this.updateCount({ count, resourceKey: resource.key });
    }

    return (
      <ResourceCounter
        key={resource.key}
        resourceKey={resource.key}
        format={resource.format}
        summary={I18n.t(resource.summary)}
        count={count}
        onCountChanged={this.updateCount}
      />
    );
  }
  
  render() {
    return (
      <View style={styles.createLocationContainer}>
        <View style={styles.results_inner_container}>
          <ChooseStatus updateStatus={this.updateStatus} />
  
          <View style={styles.resources_container}>
            {this.props.resources.map(this.showResource) }
          </View>
        </View>
      </View>
    );
  }
}

LocationCreation.propTypes = { // Sorted Alphabetically
  resources: PropTypes.array.isRequired,
};

export default LocationCreation;
