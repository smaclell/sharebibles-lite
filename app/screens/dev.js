import {
  Button,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import stylesLogin from '../styles/main';
import * as actions from '../actions/distributions';
import GetLocation from '../components/GetLocation';

class Dev extends React.Component {
  static navigationOptions = {
    title: 'Developer Testing Screen',
  }

  static propTypes = {
    createDistribution: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      location: 'unknown',
    };
  }

  render() {
    const clickCreate = () => this.props.createDistribution({
      name: 'Test',
      notes: 'we love testing',
    });

    const updateLocation = location => this.setState(p => ({ ...p, location }));

    return (
      <KeyboardAvoidingView behavior="padding" style={stylesLogin.container}>
        <View style={stylesLogin.container}>
          <View style={stylesLogin.inner_Container}>
            <Text style={{ fontSize: 20, margin: 5 }}>
              This is a test screen. Have fun!
            </Text>
            <Button
              onPress={clickCreate}
              title="Create Test Distribution"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Text>Location: {JSON.stringify(this.state.location || 'unknown')}</Text>
            <GetLocation onLocationChanged={updateLocation} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createDistribution(args) {
    return dispatch(actions.createDistribution(args));
  },
});

export default connect(null, mapDispatchToProps)(Dev);
