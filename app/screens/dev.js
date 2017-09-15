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

class Dev extends React.Component {
  static navigationOptions = {
    title: 'Developer Testing Screen',
  }

  static propTypes = {
    createDistribution: PropTypes.func.isRequired,
  }

  render() {
    const clickCreate = () => this.props.createDistribution({
      name: 'Test',
      notes: 'we love testing',
    });

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
