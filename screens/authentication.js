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
import colours from '../styles/colours';
import fonts from '../styles/fonts';

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
        { /*
          TODO:
            Need to figure out how to make the keyboard work better
            (not hide the text fields)
        */ }
        <KeyboardAvoidingView behavior="padding" style={styles.inner_container} keyboardVerticalOffset={60}>

          <Text style={styles.header}> Share Bibles </Text>
          <View style={styles.logo_container}>
            <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
          </View>

          <View style={styles.white_box}>
            <Text style={styles.subtitle}> Sign In </Text>

            <TextInput
              style={styles.textinput_container}
              placeholderTextColor={colours.placeholder}
              placeholder="your@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={(email) => { this.setState({ email }); }}
              value={this.state.email}
            />

            <TextInput
              style={styles.textinput_container}
              placeholder="Password"
              placeholderTextColor={colours.placeholder}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => { this.setState({ password }); }}
              value={this.state.password}
            />

            <View style={styles.login_button}>
              <Button onClick={signIn}>LOG IN</Button>
            </View>

            <View style={styles.sign_up_container}>
              <Text style={{ color: colours.text, fontSize: fonts.small, fontWeight: 'normal' }}> Don&rsquo;t have an account? </Text>
              <TouchableOpacity onPress={() => navigate('SignUp')}>
                <Text style={{ color: colours.primaryButton, fontSize: fonts.small, fontWeight: 'normal', textDecorationLine: 'underline' }}>
                  Create One </Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
