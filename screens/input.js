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
import ResourceCounter from '../components/ResourceCounter';
import Status from '../components/Status';
import Switch from '../components/Switch';
import styles from '../styles/input';

const statusIconsSize = 28;

class Input extends React.Component {
  static navigationOptions = {
    title: 'First Visit',
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: 'unknown',
      longitude: null,
      latitude: null,
      resources: {},
      tags: {},
    };

    this.showResource = this.showResource.bind(this);
    this.showTag = this.showTag.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this);
  }

  /* NOTES: */
  /* SHOULD BE FLAT LIST */
  /* CAMERA ON THE LEFT */

  add() {
    const {
      status,
      longitude,
      latitude,
      resources,
      tags,
    } = this.state;

    this.props.createLocation({
      status,
      imageUrl: null,
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
        resource={resource}
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
        {tag.label}
      </Switch>
    );
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
          <CurrentLocation onLocationChanged={this.updateCurrentLocation} />
          <Text> Or </Text>
          <CurrentLocation onLocationChanged={this.updateCurrentLocation} />
        </View>

        <View style={styles.results_container}>

          <View style={styles.status_container}>
            <Status label="Accepted" onPressed={() => this.updateStatus('accepted')} selected={this.state.status === 'accepted'}>
              <FontAwesome name="check" size={statusIconsSize} color={'white'} />
            </Status>
            <Status label="Delivered" onPressed={() => this.updateStatus('delivered')} selected={this.state.status === 'delivered'}>
              <FontAwesome name="book" size={statusIconsSize} color={'white'} />
            </Status>
            <Status label="Not Home" onPressed={() => this.updateStatus('not-home')} selected={this.state.status === 'not-home'}>
              <FontAwesome name="repeat" size={statusIconsSize} color={'white'} />
            </Status>
            <Status label="Rejected" onPressed={() => this.updateStatus('rejected')} selected={this.state.status === 'rejected'}>
              <FontAwesome name="close" size={statusIconsSize} color={'white'} />
            </Status>
          </View>

          <View style={styles.info_container}>
            {this.props.tags.map(this.showTag) }
          </View>
          <View style={styles.resources_container}>
            {this.props.resources.map(this.showResource) }
          </View>
        </View>

        <View style={styles.actions_container}>
          <Button onClick={() => this.add()}>ADD</Button>
          <Button onClick={() => this.props.navigation.goBack()}>CANCEL</Button>
        </View>


      </ScrollView>
    );
  }
}

Input.propTypes = { // Sorted Alphabetically
  createLocation: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.users[state.user],
  resources: Object.keys(state.resources).map(r => state.resources[r]),
  tags: state.tags.location,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(locationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);
