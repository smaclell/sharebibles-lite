import {
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import stylesLogin from '../styles/main';

export default class Conversations extends React.Component {
  static navigationOptions = {
    title: 'Conversations',
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={stylesLogin.container}>
        <View style={stylesLogin.container}>
          <View style={stylesLogin.inner_Container}>
            <Text style={{ fontSize: 20, margin: 5 }}>
              Sorry this feature isn&#39;t available yet.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
