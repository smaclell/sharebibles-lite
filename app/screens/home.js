/* globals __DEV__ */
import {
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import Button from '../components/Button';
import style from '../styles/home';
import color from '../constants/colors';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={style.container}>
        <View style={style.inner_Container}>

          <Text style={{ color: color.mintCream, fontSize: 35, margin: 5, marginBottom: 25, textAlign: 'center' }}>
              Welcome to Share Bibles
          </Text>

          <Image style={style.logo_container} source={require('../assets/logo/logo.png')} />

          <Button onClick={() => navigate('Input')}>Input</Button>

          <Button onClick={() => navigate('Conversations')}>Conversations</Button>

          { __DEV__ && <Button onClick={() => navigate('MapsView')}>Map</Button> }

          { __DEV__ && <Button onClick={() => navigate('Settings')}>Settings</Button> }

          {__DEV__ && <Button onClick={() => navigate('Dev')}>Development</Button> }

        </View>
      </View>
    );
  }
}
