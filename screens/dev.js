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
import * as actions from '../actions/locations';
import CurrentLocation from '../components/CurrentLocation';
import ResourceCounter from '../components/ResourceCounter';
import User from '../components/User';
import Switch from '../components/Switch';

class Dev extends React.Component {
  static propTypes = {
    createLocation: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  static defaultProps = {
    user: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      location: 'unknown',
      toggled: true,
      count: 0,
    };
  }

  render() {
    const clickCreate = () => this.props.createLocation({
      name: 'Test',
      notes: 'we love testing',
    });

    const updateCurrentLocation = location => this.setState(p => ({ ...p, location }));
    const updateCount = ({ count }) => this.setState(p => ({ ...p, count }));

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
              title="Create Test Location"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />

            <Text>Count: {this.state.count}</Text>
            <ResourceCounter onCountChanged={updateCount} {...this.props} />

            <Text>Location: {JSON.stringify(this.state.location || 'unknown')}</Text>
            <CurrentLocation onLocationChanged={updateCurrentLocation} />

            <Switch
              onChange={value => this.setState(p => ({ ...p, toggled: value }))}
              value={this.state.toggled}
            >
            text
            </Switch>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  const resourceKey = Object.keys(state.resources)[0];
  const resource = state.resources[resourceKey];
  return {
    resource,
    user: state.user ? state.users[state.user] : null,
  };
};

const mapDispatchToProps = dispatch => ({
  createLocation(args) {
    return dispatch(actions.createLocation(args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dev);
