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

    this.showResource = this.showResource.bind(this);
    this.showTag = this.showTag.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.updateImageUrl = this.updateImageUrl.bind(this);
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this);
  }

  /* NOTES: */
  /* SHOULD BE FLAT LIST */
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

    this.props.createLocation({
      status,
      imageUrl,
      name: 'TBD',
      address: null,
      longitude,
      latitude,
      notes: 'none',
      resources,
      tags,
    });

    this.goBack();
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.setState(createInitialState());
  };

  showResource(resource) {
    return (
      <ResourceCounter
        key={resource.key}
        resourceKey={resource.key}
        format={resource.format}
        summary={I18n.t(resource.summary)}
        onCountChanged={this.updateCount}
      />
    );
  }

  showTag(tag) {
    return (
      <Switch
        key={tag.key}
        onChange={enabled => this.updateTag(tag.key, enabled)}
        value={!!this.state.tags[tag.key]}
      >
        {I18n.t(tag.label)}
      </Switch>
    );
  }

  updateCount({ count, resourceKey }) {
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

  updateImageUrl(imageUrl) {
    this.setState(p => ({ ...p, imageUrl }));
  }

  updateCurrentLocation(location) {
    const { longitude = null, latitude = null } = location || {};
    this.setState(p => ({ ...p, longitude, latitude }));
  }

  updateStatus = value => this.setState({ status: value });

  updateTag(tagKey, enabled) {
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
          <View style={styles.add_members_section_container}>
            <Users showUpdateUsers={() => this.props.navigation.navigate('ChooseUsers')} />
          </View>

          <View style={styles.add_location_section_container}>
            <Photo onPhotoChanged={this.updateImageUrl} />
            { !latitude && <Text> {I18n.t('initial/or')} </Text> }
            <CurrentLocation
              latitude={latitude}
              longitude={longitude}
              onLocationChanged={this.updateCurrentLocation}
            />
          </View>

          <View style={styles.results_container}>
            <ChooseStatus updateStatus={this.updateStatus} />

            <View style={styles.tag_container}>
              {this.props.tags.map(this.showTag) }
            </View>
            <View style={styles.resources_container}>
              {this.props.resources.map(this.showResource) }
            </View>
          </View>
        </ScrollView>
        <View style={styles.actions_container}>
          <PrimaryButton onClick={this.add}>{I18n.t('button/add')}</PrimaryButton>
          <SecondaryButton onClick={this.goBack}>{I18n.t('button/cancel')}</SecondaryButton>
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
