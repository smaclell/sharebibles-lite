import {
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import style from '../styles/home';
import color from '../constants/colors';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={style.container}>
          <View style={style.inner_Container}>
            
            <Text style={{color: color.mintCream, fontSize: 35, margin: 5, marginBottom: 25, textAlign: 'center' }}>
              Welcome to Share Bibles
            </Text>

            <Image style={style.logo_container} source={require('../assets/logo/logo.png')}/>

            <TouchableOpacity onPress = {()=>navigate('Input')} style={style.button_container}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}> Input </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>navigate('MapView')} style={style.button_container}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}> Map View </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>navigate('Conversations')} style={style.button_container}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}> Conversations </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress = {()=>navigate('Settings')} style={style.button_container}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}> Settings </Text>
            </TouchableOpacity>

          </View>
        </View>
    );
  }
}
