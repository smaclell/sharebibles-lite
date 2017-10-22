import {
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import stylesLogin from '../styles/main';
import I18n from '../assets/i18n/i18n';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: I18n.t('title_settings'),
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={stylesLogin.container}>
        <View style={stylesLogin.container}>
          <View style={stylesLogin.inner_Container}>
            <Text style={{ fontSize: 20, margin: 5 }}>
              {I18n.t('settings_not_implemented')}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
