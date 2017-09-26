import {
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from '../components/User';
import Location from '../components/GetLocation';
import styles from '../styles/add-distribution';

class Input extends React.Component {
  static navigationOptions = {
    title: 'Start Conversation',
  }

  /* NOTES: */
  /* SHOULD BE FLAT LIST */
  /* CAMERA ON THE LEFT */
  /* Make status buttons a component */
  /* # of Bibles Button Section NOT COMPLETED */

  render() {
    return (
      <View style={styles.container}>
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
            <TouchableOpacity style={styles.status_container}>
              <Text style={styles.all_purpose_circle_portrait}> TICK </Text>
              <Text> Accepted </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.status_container}>
              <Text style={styles.all_purpose_circle_portrait}> Plane </Text>
              <Text> Delivered </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.status_container}>
              <Text style={styles.all_purpose_circle_portrait}> ? </Text>
              <Text> Not Home </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.status_container}>
              <Text style={styles.all_purpose_circle_portrait}> Cross </Text>
              <Text> Rejected </Text>
            </TouchableOpacity>
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


      </View>
    );
  }
}

Input.propTypes = {
  user: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: state.users[state.user],
  resources: Object.keys(state.resources).map(r => state.resources[r]),
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Input);
