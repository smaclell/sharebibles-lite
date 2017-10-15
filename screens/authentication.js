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
import Button from '../components/Button';
import styles from '../styles/main';
import fonts from '../styles/fonts';
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
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.inner_container}>
          <Text style={{ color: color.mintCream, fontSize: fonts.header, fontWeight: 'normal', margin: 15 }}> Share Bibles </Text>
          <View style={styles.logo_container}>
            <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
          </View>
          <Text style={{ color: color.mintCream, fontSize: fonts.large, fontWeight: 'normal', marginBottom: 15 }}> Login to Share Bibles </Text>

          <TextInput
            style={styles.textinput_container}
            placeholderTextColor="black"
            placeholder="you@email.com"
            keyboardType="email-address"
            onChangeText={(email) => { this.setState({ email }); }}
            value={this.state.email}
          />

          <TextInput
            style={styles.textinput_container}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            onChangeText={(password) => { this.setState({ password }); }}
            value={this.state.password}
          />

          <View style={styles.login_button}>
            <Button onClick={signIn}>Log In</Button>
          </View>

          { __DEV__ &&
            <View style={styles.sign_up_container}>
              <Text style={{ color: color.mintCream, fontSize: fonts.normal, fontWeight: 'normal' }}> Don&rsquo;t have an account? </Text>
              <TouchableOpacity onPress={() => navigate('SignUp')}>
                <Text style={{ color: color.flame, fontSize: fonts.normal, fontWeight: 'normal', textDecorationLine: 'underline' }}>
                  Create One </Text>
              </TouchableOpacity>
            </View>
          }

        </KeyboardAvoidingView>
      </View>
    );
  }
}
