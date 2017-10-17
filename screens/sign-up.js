import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  Image,
  TextInput,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import Button from '../components/Button';
import styles from '../styles/main';
import colours from '../styles/colours';

export default class sharebiblesCreateAccount extends Component {
  static navigationOptions = {
    title: 'Sign In or Up',
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation;

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
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                autoCapitalize="words"
                placeholder="Sam Smith"
              />

              <TextInput
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder="your@email.com"
                keyboardType="email-address"
              />

              <TextInput
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
                  style={styles.textinput_container}
                  placeholder="Access Code"
                />
              </View>

              <View style={styles.login_button}>
                <Button onClick={() => navigate('Home')}>Create Account</Button>
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
