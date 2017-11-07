/* globals __DEV__ */
import React, { Component } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import Button from '../components/Button';
import * as authenticationActions from '../actions/authentication';
import styles from '../styles/main';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

class SignUp extends Component {
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
      confirmPassword: '',
      accessCode: '',
      loading: false,
    };

    this.createAccount = this.createAccount.bind(this);
  }

  createAccount() {
    if (this.state.password !== this.state.confirmPassword) {
      return Alert.alert(
        I18n.t('sign_up/failed_confirmation_title'),
        I18n.t('sign_up/failed_confirmation_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }

    const { navigation: { navigate }, signUp } = this.props;

    this.setState({ loading: true });

    return signUp(this.state.name, this.state.email, this.state.password, this.state.accessCode)
      .then(() => navigate('Home'))
      .catch((e) => {
        if (__DEV__) {
          console.error(e); // eslint-disable-line no-console
        }

        Alert.alert(
          I18n.t('sign_up/failed_sign_up_title'),
          I18n.t('sign_up/failed_sign_up_message'),
          [{ text: I18n.t('sign_up/failed_button'), onPress() {} }],
          { cancelable: false },
        );
      })
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { navigation: { navigate } } = this.props;

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
                onChangeText={name => this.setState({ name })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                autoCapitalize="words"
                placeholder={I18n.t('sign_up/example_name')}
              />

              <TextInput
                onChangeText={email => this.setState({ email })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_in/your_email')}
                keyboardType="email-address"
              />

              <TextInput
                onChangeText={password => this.setState({ password })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_in/your_password')}
                secureTextEntry
              />

              <TextInput
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_up/confirm_your_password')}
                secureTextEntry
              />

              <View style={styles.notice_container}>
                <Text style={styles.instructions}>
                  {I18n.t('sign_up/instructions')}
                </Text>

                <TextInput
                  onChangeText={accessCode => this.setState({ accessCode })}
                  style={styles.textinput_container}
                  placeholder={I18n.t('sign_up/your_access_code')}
                />
              </View>

              <View style={styles.login_button}>
                <Button disabled={this.state.loading} onClick={this.createAccount}>{
                  this.state.loading ? I18n.t('button/loading') : I18n.t('button/create_account')
                }</Button>
              </View>

              <View style={styles.sign_in_container}>
                <Text style={{ color: colours.text, fontSize: fonts.small, fontWeight: 'normal' }}> {I18n.t('sign_up/existing')} </Text>
                <TouchableOpacity onPress={() => navigate('SignIn')}>
                  <Text style={{ color: colours.primaryButton, fontSize: fonts.small, fontWeight: 'normal', textDecorationLine: 'underline' }}>
                    {I18n.t('sign_up/sign_in')} </Text>
                </TouchableOpacity>
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authenticationActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SignUp);
