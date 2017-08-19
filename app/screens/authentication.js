import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import stylesLogin from '../styles/main';
import color from '../constants/colors';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: 'Sign In or Up',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={stylesLogin.container}>
        <View style={stylesLogin.inner_container}>
          
          <Text style={{color: color.mintCream, fontSize: 40, fontWeight: 'normal', margin: 15}}> Share Bibles </Text>
          <Image source={require('../../app/assets/logo/logo.png')} style={stylesLogin.logo_container}/>          
          <Text style={{color: color.mintCream, fontSize: 18, fontWeight: 'normal', marginBottom: 15}}> Login to Share Bibles </Text>
          <Text style={{color: color.mintCream, fontSize: 14, fontWeight: 'normal', marginBottom: 8}}> Don't have an account? </Text>

          <TouchableOpacity onPress={()=>navigate('SignUp')}> 
            <Text style={{color: color.flame, fontSize: 14, fontWeight: 'normal', marginBottom: 20, textDecorationLine: 'underline'}}> 
              Create One </Text>
           </TouchableOpacity>

          <TextInput style={stylesLogin.textinput_container}
            placeholder = 'Username'/>

          <TextInput style={stylesLogin.textinput_container}
            placeholder = 'Password'
            secureTextEntry />

          <TouchableOpacity style={stylesLogin.login_button} onPress={()=>navigate('Home')}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}> Log In </Text>
           </TouchableOpacity>
           

        </View>
      </View>
    );
  }
}
