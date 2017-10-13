/* globals __DEV__ */
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import stylesLogin from '../styles/main';
import color from '../constants/colors';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: 'Sign In or Up',
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    const signIn = () => {
      const destination = 'Home';
      return Promise.resolve()
        .then(() => this.props.signIn(this.state.email, this.state.password))
        .then(() => navigate(destination))
        .catch((e) => {
          if (__DEV__) {
            console.error(e); // eslint-disable-line no-console
          }

          Alert.alert(
            'Could not sign in',
            'Please check your email and password',
            [{ text: 'OK', onPress() {} }],
            { cancelable: false },
          );
        });
    };

    return (
      <View style={stylesLogin.container}>
        <KeyboardAvoidingView behavior="padding" style={stylesLogin.inner_container}>

          <Text style={{ color: color.mintCream, fontSize: 40, fontWeight: 'normal', margin: 15 }}> Share Bibles </Text>
          <Image source={require('../assets/logo/logo.png')} style={stylesLogin.logo_container} />
          <Text style={{ color: color.mintCream, fontSize: 18, fontWeight: 'normal', marginBottom: 15 }}> Login to Share Bibles </Text>
          <Text style={{ color: color.mintCream, fontSize: 14, fontWeight: 'normal', marginBottom: 8 }}> Don&rsquo;t have an account? </Text>

          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <Text style={{ color: color.flame, fontSize: 14, fontWeight: 'normal', marginBottom: 20, textDecorationLine: 'underline' }}>
              Create One </Text>
          </TouchableOpacity>

          <TextInput
            style={stylesLogin.textinput_container}
            placeholderTextColor="black"
            placeholder="you@email.com"
            keyboardType="email-address"
            onChangeText={(email) => { this.setState({ email }); }}
            value={this.state.email}
          />

          <TextInput
            style={stylesLogin.textinput_container}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            onChangeText={(password) => { this.setState({ password }); }}
            value={this.state.password}
          />

          <TouchableOpacity style={stylesLogin.login_button} onPress={signIn}>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}> Log In </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
