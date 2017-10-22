/* globals __DEV__ */
import React, { Component } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import Button from '../components/Button';
import * as authenticationActions from '../actions/authentication';
import styles from '../styles/main';
import colours from '../styles/colours';

class SignUp extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    header: null,
  }

  static propTypes = {
    signUp: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      accessCode: '',
    };

    this.createAccount = this.createAccount.bind(this);
  }

  createAccount() {
    const { navigation: { navigate }, signUp } = this.props;

    return signUp(this.state.name, this.state.email, this.state.password, this.state.accessCode)
      .then(() => navigate('Home'))
      .catch((e) => {
        if (__DEV__) {
          console.error(e); // eslint-disable-line no-console
        }

        Alert.alert(
          'Could not sign up',
          'Please check your email and password',
          [{ text: 'OK', onPress() {} }],
          { cancelable: false },
        );
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inner_container}>

            <Text style={styles.header}> Share Bibles </Text>

            <View style={styles.logo_container}>
              <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.white_box}>
              <Text style={styles.subtitle}>
                Create Your Account
              </Text>

              <TextInput
                onChangeText={name => this.setState({ name })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                autoCapitalize="words"
                placeholder="Sam Smith"
              />

              <TextInput
                onChangeText={email => this.setState({ email })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder="your@email.com"
                keyboardType="email-address"
              />

              <TextInput
                onChangeText={password => this.setState({ password })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder="Password"
                secureTextEntry
              />

              <View style={styles.notice_container}>
                <Text style={styles.instructions}>
                You will need an access code for your team to continue.
                </Text>

                <TextInput
                  onChangeText={accessCode => this.setState({ accessCode })}
                  style={styles.textinput_container}
                  placeholder="Access Code"
                />
              </View>

              <View style={styles.login_button}>
                <Button onClick={this.createAccount}>Create Account</Button>
              </View>

              <Text style={styles.terms}>
                By clicking &quot;Create Account&quot; you agree to the Terms and Conditions
              </Text>

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authenticationActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SignUp);
