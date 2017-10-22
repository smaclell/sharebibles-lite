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
import I18n from '../assets/i18n/i18n';
import moment from 'moment';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: I18n.t('sign_in_sign_in'),
    header: null,
  }

  async componentWillMount() {
    const dummy = await Promise.all([
      I18n.initAsync()
    ]);
    console.info(I18n.locale);
    moment.locale(I18n.locale)
    this.setState({appIsReady: true }); // when all above promises above are resolved
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
      appIsReady: false
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
            I18n.t('sign_in_failed_signin'),
            I18n.t('sign_in_check_email_password'),
            [{ text: I18n.t('button_ok'), onPress() {} }],
            { cancelable: false },
          );
        });
    };

    if (!this.state.appIsReady) {
      return (
        <View>
          {
            /*
              LOADING
            */
          }
        </View>
      );
    }

    return (

      <View style={styles.container}>
        { /*
          TODO:
            Need to figure out how to make the keyboard work better
            (not hide the text fields)
        */ }
        <KeyboardAvoidingView behavior="padding" style={styles.inner_container} keyboardVerticalOffset={60}>

          <Text style={styles.header}> {I18n.t('title_share_bibles')} </Text>
          <View style={styles.logo_container}>
            <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
          </View>

          <View style={styles.white_box}>
            <Text style={styles.subtitle}> {I18n.t('sign_in_sign_in')} </Text>

            <TextInput
              style={styles.textinput_container}
              placeholderTextColor={colours.placeholder}
              placeholder={I18n.t('sign_in_your_email')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={(email) => { this.setState({ email }); }}
              value={this.state.email}
            />

            <TextInput
              style={styles.textinput_container}
              placeholder= {I18n.t('sign_in_your_password')}
              placeholderTextColor={colours.placeholder}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => { this.setState({ password }); }}
              value={this.state.password}
            />

            <View style={styles.login_button}>
              <Button onClick={signIn}>{I18n.t('sign_in_log_in')}</Button>
            </View>

            { __DEV__ &&
              <View style={styles.sign_up_container}>
                <Text style={{ color: colours.text, fontSize: fonts.small, fontWeight: 'normal' }}> {I18n.t('sign_in_no_account')} </Text>
                <TouchableOpacity onPress={() => navigate('SignUp')}>
                  <Text style={{ color: colours.primaryButton, fontSize: fonts.small, fontWeight: 'normal', textDecorationLine: 'underline' }}>
                    {I18n.t('sign_in_create_one')} </Text>
                </TouchableOpacity>
              </View>
            }

          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
