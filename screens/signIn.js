/* globals __DEV__ */
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import * as actions from '../actions/authentication';
import Button from '../components/Button';
import KeyboardScroll from '../components/KeyboardScroll';
import styles from '../styles/main';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

class SignIn extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      appIsReady: false,
      loading: false,
    };
  }

  componentWillMount() {
    // If signin restore worked then skip signin screen
    if (this.props.user) {
      this.props.navigation.navigate('Home');
    }

    this.setState({ appIsReady: true });
  }

  onFocus = event => this.scroll.onFocus(event)

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
      Keyboard.dismiss();
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
            <Text>Hey</Text>
          }
        </View>
      );
    }


    return (

      <View style={styles.container}>
        <KeyboardScroll
          ref={(r) => {
            this.scroll = r;
          }}
          style={styles.outer_container}
        >
          <View style={styles.inner_container}>
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
                onFocus={this.onFocus}
                placeholderTextColor={colours.placeholder}
                placeholder={I18n.t('sign_in/your_email')}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
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
                onFocus={this.onFocus}
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
          </View>
        </KeyboardScroll>
      </View>
    );
  }
}

SignIn.propTypes = {
  connected: PropTypes.bool.isRequired,
  user: PropTypes.string,
};

const mapStateToProps = state => ({
  connected: state.connected,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
