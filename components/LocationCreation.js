import React, { Component } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Sentry from 'sentry-expo';
import I18n from '../assets/i18n/i18n';
import Icon from '../components/Icon';
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
<<<<<<< HEAD
    borderRadius: 8,
    backgroundColor: colours.white,
=======
    marginTop: 50,
  },

  onBoardingContainer: {
    position: 'absolute',
    width: '100%',
    top: -50,
    backgroundColor: colours.white,
    borderRadius: 5,
  },

  hintText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
>>>>>>> Add more steps, clean up code
  },

  controlsContainer: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
<<<<<<< HEAD
    backgroundColor: colours.core.blue,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
=======
    backgroundColor: colours.white,
>>>>>>> Add more steps, clean up code
  },

  controlButton: {
    margin: 7,
    borderRadius: 8,
  },

  saveButton: {
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: colours.core.white,
  },

  saveButtonDisabled: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  buttonText: {
    fontSize: fonts.large,
    color: colours.core.white,
  },

  buttonTextDisabled: {
    fontSize: fonts.large,
    color: colours.transparent,
  },

  resultsInnerContainer: {
    width: '100%',
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.white,
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
  state = createInitialState();

  saveLocation = async ({ status, resources }) => {
    try {
      const { longitude, latitude } = this.props.location;
      await this.props.createLocation({
        status,
        longitude,
        latitude,
        resources,
      });
    } catch (err) {
      Sentry.captureException(err, { extra: { status } });

      Alert.alert(
        I18n.t('validation/unknown_error_title'),
        I18n.t('validation/unknown_error_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }
    this.props.onLocationCancel();
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

    return this.saveLocation({
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
        { !this.props.isOnboarded &&
          <View style={styles.onBoardingContainer}>
            <Text style={styles.hintText}>{I18n.t('onboarding/move_pin_hint')}</Text>
          </View>
        }
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={this.props.onLocationCancel}>
            <Icon name="chevron-down" family="entypo" size="medium" colour={colours.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addLocation} style={buttonStyle} disabled={isDisabled}>
            <Text style={buttonTextStyle}>{I18n.t('button/save')}</Text>
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
  createLocation: PropTypes.func.isRequired,
  isOnboarded: PropTypes.bool.isRequired,
  onLocationCancel: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};

LocationCreation.defaultProps = {
  location: null,
};

export default LocationCreation;
