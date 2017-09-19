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
import User from '../components/User';

class Dev extends React.Component {
  static navigationOptions = {
    title: 'Developer Testing Screen',
  }

  static propTypes = {
    createDistribution: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  static defaultProps = {
    user: null,
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

            {this.props.user && <User {...this.props.user} />}

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

const mapStateToProps = state => ({
  user: state.user ? state.users[state.user] : null,
});

const mapDispatchToProps = dispatch => ({
  createDistribution(args) {
    return dispatch(actions.createDistribution(args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dev);
