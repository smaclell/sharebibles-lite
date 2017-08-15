import {
  Button,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import stylesLogin from '../styles/main';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: 'Sign In or Up',
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
            <Image source={require('../assets/logo/logo.png')} style={stylesLogin.logoImage} />
            <Text style={{ fontSize: 20, margin: 5 }}> Login to Share Bibles </Text>
            <Text style={{ fontSize: 13, margin: 5, fontWeight: 'bold', marginBottom: 10 }}> Forgot your password?
              <Text style={{ textDecorationLine: 'underline', color: '#5C9492' }}> Click Here </Text>
            </Text>
            <TextInput
              style={stylesLogin.userPass_TextBox}
              placeholder=" Username"
            />
            <TextInput
              style={stylesLogin.userPass_TextBox}
              placeholder=" Password"
              secureTextEntry
            />
            <Button
              onPress={() => navigate('Home')}
              style={stylesLogin.button}
              title="Login"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
