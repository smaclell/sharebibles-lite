/* globals __DEV__ */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

  getButtonText() {
    if (!this.props.connected) {
      return I18n.t('button/offline');
    }

    if (this.state.loading) {
      return I18n.t('button/loading');
    }

    return I18n.t('button/create_account');
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
          [{ text: I18n.t('button/ok'), onPress() {} }],
          { cancelable: false },
        );

        this.setState({ loading: false });
      });
  }

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.outer_container}
          showsVerticalScrollIndicator={false}
        >
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
                returnKeyType="next"
                onSubmitEditing={() => this.email.focus()}
              />

              <TextInput
                ref={(t) => {
                  this.email = t;
                }}
                onChangeText={email => this.setState({ email })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_in/your_email')}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => this.password.focus()}
              />

              <TextInput
                ref={(t) => {
                  this.password = t;
                }}
                onChangeText={password => this.setState({ password })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_in/your_password')}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => this.confirmPassword.focus()}
              />

              <TextInput
                ref={(t) => {
                  this.confirmPassword = t;
                }}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                style={styles.textinput_container}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_up/confirm_your_password')}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => this.accessCode.focus()}
              />

              <View style={styles.notice_container}>
                <Text style={styles.instructions}>
                  {I18n.t('sign_up/instructions')}
                </Text>

                <TextInput
                  ref={(t) => {
                    this.accessCode = t;
                  }}
                  onChangeText={accessCode => this.setState({ accessCode })}
                  style={styles.textinput_container}
                  placeholder={I18n.t('sign_up/your_access_code')}
                  returnKeyType="done"
                />
              </View>

              <View style={styles.login_button}>
                <Button
                  disabled={!this.props.connected || this.state.loading}
                  onClick={this.createAccount}
                >
                  {this.getButtonText()}
                </Button>
                {this.state.loading && <ActivityIndicator />}
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
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

SignUp.propTypes = {
  connected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  connected: state.connected,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authenticationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
