/* globals __DEV__ */
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import * as actions from '../actions/authentication';
import Button from '../components/Button';
import styles from '../styles/main';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

class SignIn extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      appIsReady: false,
      loading: false,
    };
  }

  async componentWillMount() {
    await Promise.all([
      I18n.initAsync(),
    ]);

    I18n.setDateLocale();

    this.setState({ appIsReady: true }); // when all above promises above are resolved

    this.props.restoreSignIn(() => this.props.navigation.navigate('Home'));
  }

  getButtonText() {
    if (!this.props.connected) {
      return I18n.t('button/offline');
    }

    if (this.state.loading) {
      return I18n.t('button/loading');
    }

    return I18n.t('sign_in/sign_in');
  }

  render() {
    const { navigate } = this.props.navigation;

    const signIn = () => {
      const destination = 'Home';
      this.setState({ loading: true });

      return Promise.resolve()
        .then(() => this.props.signIn(this.state.email, this.state.password))
        .then(() => navigate(destination))
        .catch((e) => {
          if (__DEV__) {
            console.error(e); // eslint-disable-line no-console
          }

          Alert.alert(
            I18n.t('sign_in/failed_signin'),
            I18n.t('sign_in/check_email_password'),
            [{ text: I18n.t('button/ok'), onPress() {} }],
            { cancelable: false },
          );

          this.setState({ loading: false });
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
        <KeyboardAvoidingView behavior="padding" style={styles.inner_container}>
          <View style={styles.header_container}>
            <Text style={styles.header}> {I18n.t('title/share_bibles')} </Text>
            <View style={styles.logo_container}>
              <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
            </View>
          </View>

          <View style={styles.white_box}>
            <Text style={styles.subtitle}> {I18n.t('title/sign_in')} </Text>

            <View style={styles.link_container}>
              <Text style={{ color: colours.text, fontSize: fonts.small, fontWeight: 'normal' }}> {I18n.t('sign_in/no_account')} </Text>
              <TouchableOpacity onPress={() => navigate('SignUp')}>
                <Text style={{ color: colours.teals.base, fontSize: fonts.small, fontWeight: 'normal', textDecorationLine: 'underline' }}>
                  {I18n.t('sign_in/create_one')} </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.textinput_container}
              placeholderTextColor={colours.placeholder}
              placeholder={I18n.t('sign_in/your_email')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              autoFocus
              onChangeText={(email) => { this.setState({ email }); }}
              value={this.state.email}
              returnKeyType="next"
              onSubmitEditing={() => this.password.focus()}
            />

            <TextInput
              ref={(t) => {
                this.password = t;
              }}
              style={styles.textinput_container}
              placeholder={I18n.t('sign_in/your_password')}
              placeholderTextColor={colours.placeholder}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => { this.setState({ password }); }}
              value={this.state.password}
              returnKeyType="go"
              onSubmitEditing={signIn}
            />

            <View style={styles.login_button}>
              <Button
                disabled={!this.props.connected || this.state.loading}
                onClick={signIn}
              >
                {this.getButtonText()}
              </Button>
              {this.state.loading && <ActivityIndicator style={styles.loading} />}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

SignIn.propTypes = {
  connected: PropTypes.bool.isRequired,
  restoreSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connected: state.connected,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
