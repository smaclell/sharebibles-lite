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
import I18n from '../assets/i18n/i18n';

export default class sharebiblesCreateAccount extends Component {
  static navigationOptions = {
    title: I18n.t('title/sign_up'),
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

            <Text style={styles.header}> {I18n.t('title/share_bibles')} </Text>

            <View style={styles.logo_container}>
              <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.white_box}>
              <Text style={styles.subtitle}>
                {I18n.t('sign_up/create_your_account')}
              </Text>

              <TextInput
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                autoCapitalize="words"
                placeholder={I18n.t('sign_up/example_name')}
              />

              <TextInput
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_in/your_email')}
                keyboardType="email-address"
              />

              <TextInput
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_in/your_password')}
                secureTextEntry
              />

              <View style={styles.notice_container}>
                <Text style={styles.instructions}>
                {I18n.t('sign_up/instructions')}
                </Text>

                <TextInput
                  style={styles.textinput_container}
                  placeholder={I18n.t('sign_up/your_access_code')}
                />
              </View>

              <View style={styles.login_button}>
                <Button onClick={() => navigate('Home')}>{I18n.t('button/create_account')}</Button>
              </View>

              <Text style={styles.terms}>
                {I18n.t('sign_up/conditions_agreement')}
              </Text>

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
