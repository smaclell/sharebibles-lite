import React, { Component } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import I18n from '../assets/i18n/i18n';
import ChooseStatus from '../containers/ChooseStatus';
import ResourceCounter from '../components/ResourceCounter';
import { filterResources } from '../utils/filters';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const styles = StyleSheet.create({
  createLocationContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  controlsContainer: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  controlButton: {
    padding: 5,
    borderRadius: 5,
  },

  saveButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: colours.blues.base,
    borderWidth: 1,
  },

  saveButtonDisabled: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: colours.blues.lighter,
    borderWidth: 1,
  },

  buttonText: {
    fontSize: fonts.large,
    color: colours.black,
  },

  buttonTextDisabled: {
    fontSize: fonts.large,
    color: colours.greys.lighter,
  },

  resultsInnerContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  resourceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

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

  updateStatus = (value) => {
    this.setState({ status: value });
    this.props.resources.forEach((resource) => {
      const allowStatus = resource.statuses.includes(value);
      if (allowStatus && resource.startCount > 0) {
        this.updateCount({ count: resource.startCount, resourceKey: resource.key });
      }
    });
  }

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

    return (
      <ResourceCounter
        format={resource.format}
        initialCount={resource.startCount}
        key={resource.key}
        onCountChanged={this.updateCount}
        resourceKey={resource.key}
        summary={I18n.t(resource.summary)}
      />
    );
  }

  render() {
    const isDisabled = this.state.status === 'unknown';
    const buttonStyle = isDisabled ? styles.saveButtonDisabled : styles.saveButton;
    const buttonTextStyle = isDisabled ? styles.buttonTextDisabled : styles.buttonText;
    return (
      <View style={styles.createLocationContainer}>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={this.props.onLocationCancel}>
            <Ionicons name="md-arrow-round-back" size={fonts.header} color={colours.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addLocation} style={buttonStyle} disabled={isDisabled}>
            <Text style={buttonTextStyle}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resultsInnerContainer}>
          <ChooseStatus updateStatus={this.updateStatus} />
          <View style={styles.resourcesContainer}>
            {this.props.resources.map(this.showResource) }
          </View>
        </View>
      </View>
    );
  }
}

LocationCreation.propTypes = { // Sorted Alphabetically
  onLocationCancel: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
  saveLocation: PropTypes.func.isRequired,
};

export default LocationCreation;
