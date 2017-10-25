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
import I18n from '../assets/i18n/i18n';

export default class SignInUp extends React.Component {
  static navigationOptions = {
    title: I18n.t('title/home'),
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
              {I18n.t('title/welcome')}
          </Text>

          <View style={style.logo_container}>
            <Image style={style.logo} source={require('../assets/logo/logo.png')} />
          </View>

          <Button onClick={() => navigate('Initial')}>{I18n.t('title/initial')}</Button>

          <Button onClick={() => navigate('Visits')}>{I18n.t('title/conversations')}</Button>

          <Button onClick={() => navigate('MapsView')}>{I18n.t('title/map')}</Button>

          { __DEV__ && <Button onClick={() => navigate('Settings')}>{I18n.t('title/settings')}</Button> }

          {__DEV__ && <Button onClick={() => navigate('Dev')}>{I18n.t('title/development')}</Button> }

        </View>
      </View>
    );
  }
}
