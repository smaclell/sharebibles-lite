import {
  Text,
  View,
  Switch,
  ScrollView,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import * as distributionActions from '../actions/distributions';
import User from '../components/User';
import Button from '../components/Button';
import Location from '../components/GetLocation';
import ResourceCounter from '../components/ResourceCounter';
import Status from '../components/Status';
import styles from '../styles/add-distribution';

const statusIconsSize = 32;

class Input extends React.Component {
  static navigationOptions = {
    title: 'Start Conversation',
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: 'unknown',
      longitude: null,
      latitude: null,
      resources: {},
    };

    this.showResource = this.showResource.bind(this);
    this.updateCount = this.updateCount.bind(this);
  }

  /* NOTES: */
  /* SHOULD BE FLAT LIST */
  /* CAMERA ON THE LEFT */

  add() {
    const { status, longitude, latitude } = this.state;
    this.props.createDistribution({
      status,
      name: 'TBD',
      longitude,
      latitude,
      notes: 'none',
      resources: {
        [this.props.resources[0].id]: {
          given: 1,
          needed: 0,
        },
      },
    });
    this.props.navigation.goBack();
  }

  showResource(resource) {
    return (
      <ResourceCounter
        key={resource.id}
        resource={resource}
        onCountChanged={this.updateCount}
      />
    );
  }

  updateCount({ count, resource }) {
    this.setState(p => ({
      ...p,
      resources: {
        [resource.id]: count,
      },
    }));
  }

  updateLocation(location) {
    const { longitude = null, latitude = null } = location || {};
    this.setState(p => ({ ...p, longitude, latitude }));
  }

  updateStatus(value) {
    this.setState(p => ({ ...p, status: value }));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.add_members_section_container}>
          <User {...this.props.user} />
        </View>

        <View style={styles.add_location_section_container}>
          <Location />
          <Text> Or </Text>
          <Location onLocationChanged={location => this.updateLocation(location)} />
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
            <View style={styles.switch_container}>
              <Text style={{ fontSize: 18 }}> Is Christian? </Text>
              <Switch style={{ margin: 5 }} />
            </View>
            <View style={styles.switch_container}>
              <Text style={{ fontSize: 18 }}> Cannot Read? </Text>
              <Switch style={{ margin: 5 }} />
            </View>
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

Input.propTypes = {
  createDistribution: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: state.users[state.user],
  resources: Object.keys(state.resources).map(r => state.resources[r]),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(distributionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);
