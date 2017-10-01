import {
  Text,
  View,
  Switch,
  ScrollView,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import User from '../components/User';
import Button from '../components/Button';
import Location from '../components/GetLocation';
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
    };
  }

  /* NOTES: */
  /* SHOULD BE FLAT LIST */
  /* CAMERA ON THE LEFT */
  /* # of Bibles Button Section NOT COMPLETED */

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
          <Location />
        </View>

        <View style={styles.results_container}>

          <View style={styles.distribution_status_container}>
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
            <View style={styles.inner_info_container}>
              <View style={styles.options_container}>
                <Text style={{ fontSize: 18, margin: 2 }}> Is Christian? </Text>
              </View>
              <View style={styles.options_container}>
                <Text style={{ fontSize: 18, margin: 2 }}> Cannot Read? </Text>
              </View>
              <View style={styles.options_container}>
                <Text style={{ fontSize: 18, margin: 2 }}> # of Bibles </Text>
              </View>
            </View>
            <View style={styles.switch_container}>
              <Switch style={{ margin: 5 }} />
              <Switch style={{ margin: 5 }} />
              <Text style={{ fontSize: 18 }}> - 1 + </Text>
            </View>
          </View>
        </View>

        <View style={styles.actions_container}>
          <Button onClick={() => this.props.createDistribution()}>ADD</Button>
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
  dispatch,
  createDistribution() {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);
