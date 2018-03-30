import React, { Component } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import I18n from '../assets/i18n/i18n';
import ChooseStatus from '../containers/ChooseStatus';
import ResourceCounter from '../components/ResourceCounter';
import { filterResources } from '../utils/filters';
import styles from '../styles/locationCreation';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

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

  addLocation = () => {
    const { status, resources } = this.state;

    if (!status || status === 'unknown') {
      return Alert.alert(
        I18n.t('validation/no_status_title'),
        I18n.t('validation/no_status_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }

    // Filter out resources and tags that don't match the chosen status:
    const filteredResources = filterResources(this.props.resources, resources, status);

    return this.props.saveLocation({
      status,
      resources: filteredResources,
    });
  }

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
    const isDisabled = this.state.status === 'unknown';
    const buttonColour = isDisabled ? colours.greys.base : colours.greens.base;
    return (
      <View style={styles.createLocationContainer}>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={this.props.onLocationCancel}>
            <Ionicons name="md-arrow-round-back" size={fonts.header} color={colours.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={this.addLocation} disabled={isDisabled}>
            <FontAwesome name="check" size={fonts.header} color={buttonColour} />
          </TouchableOpacity>
        </View>
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
  onLocationCancel: PropTypes.func.isRequired,
  saveLocation: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
};

export default LocationCreation;
