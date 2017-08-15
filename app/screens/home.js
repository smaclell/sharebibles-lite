import {
  Button,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import stylesLogin from '../styles/main';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior="padding" style={stylesLogin.container}>
        <View style={stylesLogin.container}>
          <View style={stylesLogin.inner_Container}>
            <Text style={{ fontSize: 20, margin: 5, marginBottom: 40 }}>
              Welcome to Share Bibles
            </Text>
            <Button
              onPress={() => navigate('Input')}
              style={stylesLogin.button}
              title="Input"
            />
            <Text />
            <Button
              onPress={() => navigate('Settings')}
              style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
              title="Settings"
            />
            <Text />
            <Button
              onPress={() => navigate('MapView')}
              style={stylesLogin.button}
              title="MapView"
            />
            <Text />
            <Button
              onPress={() => navigate('Conversations')}
              style={stylesLogin.button}
              title="Conversations"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
