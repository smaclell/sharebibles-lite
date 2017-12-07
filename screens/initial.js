/* globals __DEV__ */
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../actions/locations';
import Users from '../containers/Users';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import CurrentLocation from '../components/CurrentLocation';
import Photo from '../components/Photo';
import ResourceCounter from '../components/ResourceCounter';
import ChooseStatus from '../containers/ChooseStatus';
import Section from '../components/Section';
import Switch from '../components/Switch';
import styles from '../styles/initial';
import I18n from '../assets/i18n/i18n';

function createInitialState() {
  return {
    imageUrl: null,
    status: 'unknown',
    longitude: null,
    latitude: null,
    resources: {},
    tags: {},
  };
}

class Initial extends React.Component {
  constructor(props) {
    super(props);
    this.state = createInitialState();
  }

  /* NOTES: */
  /* CAMERA ON THE LEFT */

  add = () => {
    const {
      imageUrl,
      status,
      longitude,
      latitude,
      resources,
      tags,
    } = this.state;

    // Filter out resources that don't match the chosen status:
    const filteredResources = {};
    Object.keys(this.props.resources).forEach((key) => {
      if (this.props.resources[key].statuses.includes(status)) {
        filteredResources[key] = resources[key];
      }
    });
    // Same for tags:
    const filteredTags = tags.filter(tag => tag.statuses.includes(status));

    this.props.createLocation({
      status,
      imageUrl,
      name: 'TBD',
      address: null,
      longitude,
      latitude,
      notes: 'none',
      resources: filteredResources,
      tags: filteredTags,
    });

    this.goBack();
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.setState(createInitialState());
  };

  showResource = (resource) => {
    if (!resource.statuses.includes(this.state.status)) { return null; }

    let count = resource.startCount;
    if (this.state.resources[resource.key]) {
      count = this.state.resources[resource.key].given || count;
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

  showTag = (tag) => {
    if (!tag.statuses.includes(this.state.status)) { return null; }

    return (
      <Switch
        key={tag.key}
        onChange={enabled => this.updateTag(tag.key, enabled)}
        value={!!this.state.tags[tag.key]}
      >
        {I18n.t(tag.label)}
      </Switch>
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

  updateImageUrl = imageUrl => this.setState(p => ({ ...p, imageUrl }));

  updateCurrentLocation = (location) => {
    const { longitude = null, latitude = null } = location || {};
    this.setState(p => ({ ...p, longitude, latitude }));
  }

  updateStatus = value => this.setState({ status: value });

  updateTag = (tagKey, enabled) => {
    this.setState(p => ({
      ...p,
      tags: {
        ...p.tags,
        [tagKey]: enabled,
      },
    }));
  }

  render() {
    const { latitude, longitude } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Section style={styles.add_members_section_container} order={1}>
            <Users showUpdateUsers={() => this.props.navigation.navigate('ChooseUsers')} />
          </Section>

          <Section style={styles.add_location_section_container} order={2}>
            { __DEV__ && <Photo onPhotoChanged={this.updateImageUrl} /> }
            { __DEV__ && !latitude && <Text> {I18n.t('initial/or')} </Text> }
            <CurrentLocation
              latitude={latitude}
              longitude={longitude}
              onLocationChanged={this.updateCurrentLocation}
            />
          </Section>

          <Section style={styles.results_outer_container} order={3}>
            <View style={styles.results_inner_container}>
              <ChooseStatus updateStatus={this.updateStatus} />

              <View style={styles.tag_container}>
                {this.props.tags.map(this.showTag) }
              </View>
              <View style={styles.resources_container}>
                {this.props.resources.map(this.showResource) }
              </View>
            </View>
          </Section>
        </ScrollView>
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
  tags: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  resources: Object.keys(state.resources).map(r => state.resources[r]),
  tags: state.tags.initial,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(locationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
