import {
  Alert,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sentry from 'sentry-expo';
import * as locationActions from '../actions/locations';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import ChooseStatus from '../containers/ChooseStatus';
import CurrentLocation from '../components/CurrentLocation';
import ResourceCounter from '../components/ResourceCounter';
import Section from '../components/Section';
import { filterResources } from '../utils/filters';
import styles from '../styles/initial';
import I18n from '../assets/i18n/i18n';

function createInitialState() {
  return {
    imageUrl: null,
    status: 'unknown',
    longitude: null,
    latitude: null,
    notes: null,
    resources: {},
    tags: {},
  };
}

class Initial extends React.Component {
  constructor(props) {
    super(props);
    this.state = createInitialState();
  }

  onFocus = event => this.scroll.onFocus(event)

  // eslint-disable-next-line consistent-return
  add = async () => {
    const {
      status,
      longitude,
      latitude,
      resources,
    } = this.state;

    if (!longitude || !latitude) {
      return Alert.alert(
        I18n.t('validation/no_location_title'),
        I18n.t('validation/no_location_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }

    if (!status || status === 'unknown') {
      return Alert.alert(
        I18n.t('validation/no_status_title'),
        I18n.t('validation/no_status_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }

    try {
      // Filter out resources and tags that don't match the chosen status:
      const filteredResources = filterResources(this.props.resources, resources, status);

      await this.props.createLocation({
        status,
        longitude,
        latitude,
        resources: filteredResources,
      });

      this.goBack();
    } catch (err) {
      Sentry.captureException(err, { extra: { status } });

      Alert.alert(
        I18n.t('validation/unknown_error_title'),
        I18n.t('validation/unknown_error_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.setState(createInitialState());
  };

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
  };

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

  updateCurrentLocation = (location) => {
    const { longitude = null, latitude = null } = location || {};
    this.setState(p => ({ ...p, longitude, latitude }));
  }

  updateStatus = value => this.setState({ status: value });

  render() {
    const { latitude, longitude } = this.state;

    return (
      <View style={styles.container}>
        <Section style={styles.add_location_section_container} order={1}>
          <CurrentLocation
            latitude={latitude}
            longitude={longitude}
            onLocationChanged={this.updateCurrentLocation}
          />
        </Section>

        <Section style={styles.results_outer_container} order={2}>
          <View style={styles.results_inner_container}>
            <ChooseStatus updateStatus={this.updateStatus} />

            <View style={styles.resources_container}>
              {this.props.resources.map(this.showResource) }
            </View>
          </View>
        </Section>
        <View style={styles.actions_container}>
          <PrimaryButton style={{ margin: 10 }} onClick={this.add}>{I18n.t('button/add')}</PrimaryButton>
          <SecondaryButton style={{ margin: 10 }} onClick={this.goBack}>{I18n.t('button/cancel')}</SecondaryButton>
        </View>
      </View>
    );
  }
}

Initial.propTypes = { // Sorted Alphabetically
  createLocation: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  resources: Object.values(state.resources),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(locationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
