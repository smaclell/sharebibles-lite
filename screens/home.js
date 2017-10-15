/* globals __DEV__ */
import {
  Text,
  View,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import Button from '../components/Button';
import style from '../styles/home';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={style.container}>
        <View style={style.inner_Container}>

          <Text style={style.welcome}>
              Welcome to Share Bibles
          </Text>

          <View style={style.logo_container}>
            <Image style={style.logo} source={require('../assets/logo/logo.png')} />
          </View>

          <Button onClick={() => navigate('Input')}>Input</Button>

          <Button onClick={() => navigate('Visits')}>Conversations</Button>

          <Button onClick={() => navigate('MapsView')}>Map</Button>

          { __DEV__ && <Button onClick={() => navigate('Settings')}>Settings</Button> }

          {__DEV__ && <Button onClick={() => navigate('Dev')}>Development</Button> }

        </View>
      </View>
    );
  }
}
