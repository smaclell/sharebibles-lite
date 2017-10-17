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
import fonts from '../styles/fonts';

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

            <Text style={{ color: colours.text, fontSize: fonts.header, fontStyle: 'normal', marginBottom: 15 }}> Share Bibles </Text>


            <View style={styles.logo_container}>
              <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
            </View>

            <Text style={{ color: colours.text, fontSize: fonts.large, fontStyle: 'normal', marginBottom: 20 }}>
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
              placeholder="you@email.com"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.textinput_container}
              placeholderTextColor={colours.placeholder}
              placeholder="Password"
              secureTextEntry
            />

            <View style={styles.notice_container}>
              <Text style={{ color: colours.text, fontSize: fonts.normal, marginTop: 20, textAlign: 'center' }}>
                You will need an access code from a Bible distribution group to continue.
              </Text>

              <TextInput
                style={styles.textinput_container}
                placeholder="Access Code"
              />
            </View>

            <Button onClick={() => navigate('Home')}>Create Account</Button>

            <Text style={{ color: colours.teals.base, fontSize: fonts.small, textAlign: 'center' }}>
              By clicking &quot;Create Account&quot; you agree to the Terms and Conditions
            </Text>

          </View>
        </ScrollView>
      </View>
    );
  }
}
