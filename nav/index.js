/* globals __DEV__ */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

import Dev from '../screens/dev';
import FollowUp from '../screens/followUp';
import Tabs from './tabs';
import Login from './login';

const createGear = navigation => (
  <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => navigation.navigate('DrawerOpen')}>
    <FontAwesome size={24} name="gear" color={colours.text} />
  </TouchableOpacity>
);

const drawerScreens = {
  Tabs: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('title/share_bibles'),
      gesturesEnabled: false,
      headerLeft: createGear(navigation),
    }),
  },
};

if (__DEV__) {
  drawerScreens.Dev = {
    screen: Dev,
    navigationOptions: {
      title: 'Developer Testing Screen',
      drawerLabel: 'Dev',
    },
  };
}

const drawer = new DrawerNavigator(drawerScreens, {
  headerMode: 'float',
  drawerLockMode: 'locked-closed',
  navigationOptions: {
    headerStyle: { backgroundColor: colours.white },
    headerTintColor: colours.text,
  },
});

const drawerStack = new StackNavigator({
  Drawer: {
    screen: drawer,
  },
  FollowUp: {
    screen: FollowUp,
    navigationOptions: {
      title: I18n.t('components/follow_up'),
      tabBarVisible: false,
      gesturesEnabled: false,
    },
  },
}, {
  headerMode: 'float',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

export default new StackNavigator({
  Login: { screen: Login },
  Home: { screen: drawerStack },
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
    transitionConfig: noTransitionConfig,
  },
});
