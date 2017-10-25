import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import * as locationActions from '../actions/locations';
import User from '../components/User';
import Button from '../components/Button';
import CurrentLocation from '../components/CurrentLocation';
import Photo from '../components/Photo';
import ResourceCounter from '../components/ResourceCounter';
import Status from '../components/Status';
import Switch from '../components/Switch';
import styles from '../styles/initial';
import colours from '../styles/colours';
import I18n from '../assets/i18n/i18n';


class Initial extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: I18n.t('initial/first_visit'),
    tabBarVisible: false,
    tabBarIcon: () => (
      <View style={{ padding: 20, backgroundColor: colours.primaryButton }}>
        <FontAwesome name="plus" size={40} color={colours.white} />
      </View>
    ),
  }

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      status: 'unknown',
      longitude: null,
      latitude: null,
      resources: {},
      tags: {},
    };

    this.showResource = this.showResource.bind(this);
    this.showStatus = this.showStatus.bind(this);
    this.showTag = this.showTag.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.updateImageUrl = this.updateImageUrl.bind(this);
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this);
  }

  /* NOTES: */
  /* SHOULD BE FLAT LIST */
  /* CAMERA ON THE LEFT */

  add() {
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
    this.props.navigation.goBack();
  }

  showResource(resource) {
    return (
      <ResourceCounter
        key={resource.key}
        format={resource.format}
        summary={I18n.t(resource.key)}
        onCountChanged={this.updateCount}
      />
    );
  }

  showTag(tag) {
    return (
      <Switch
        key={tag}
        onChange={enabled => this.updateTag(tag, enabled)}
        value={!!this.state.tags[tag]}
      >
        {I18n.t(tag)}
      </Switch>
    );
  }

  showStatus(status) {
    return (
      <Status
        key={status.key}
        label={I18n.t(status.key)}
        onPressed={() => this.updateStatus(status.key)}
        selected={this.state.status === status.key}
        icon={status.icon}
      />
    )
  }

  updateCount({ count, resource }) {
    this.setState(p => ({
      ...p,
      resources: {
        [resource.key]: {
          ...p.resources[resource.key],
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

  updateStatus(value) {
    this.setState(p => ({ ...p, status: value }));
  }

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
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.add_members_section_container}>
          <User {...this.props.user} />
        </View>

        <View style={styles.add_location_section_container}>
          <Photo onPhotoChanged={this.updateImageUrl} />
          <Text> {I18n.t('initial/or')} </Text>
          <CurrentLocation onLocationChanged={this.updateCurrentLocation} />
        </View>

        <View style={styles.results_container}>

          <View style={styles.status_container}>
            {this.props.statuses.map(this.showStatus) }
          </View>

          <View style={styles.info_container}>
            {this.props.tags.map(this.showTag) }
          </View>
          <View style={styles.resources_container}>
            {this.props.resources.map(this.showResource) }
          </View>
        </View>

        <View style={styles.actions_container}>
          <Button onClick={() => this.add()}>{I18n.t('button/add')}</Button>
          <Button onClick={() => this.props.navigation.goBack()}>{I18n.t('button/cancel')}</Button>
        </View>


      </ScrollView>
    );
  }
}

Initial.propTypes = { // Sorted Alphabetically
  createLocation: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.users[state.user],
  resources: Object.keys(state.resources).map(r => state.resources[r]),
  tags: state.tags.initial,
  statuses: state.statuses,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(locationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
