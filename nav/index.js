/* globals __DEV__ */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

import Tabs from './tabs';

// Sorted Alphabetically
import Dev from '../screens/dev';
import FollowUp from '../screens/followUp';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';

const login = new StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null,
      title: I18n.t('title/sign_in'),
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
      title: I18n.t('title/sign_up'),
    },
  },
}, {
  headerMode: 'none',
});

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
  FollowUp: {
    screen: FollowUp,
    navigationOptions: {
      title: I18n.t('components/follow_up'),
      tabBarVisible: false,
      gesturesEnabled: false,
    },
  },
};

if (__DEV__) {
  drawerScreens.Dev = {
    screen: Dev,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Text onPress={() => navigation.goBack()}>Menu</Text>,
      title: 'Developer Testing Screen',
      drawerLabel: 'Dev',
    }),
  };
}

const drawer = new DrawerNavigator(drawerScreens, {
  headerMode: 'float',
  drawerLockMode: 'locked-closed',
  navigationOptions: () => ({
    headerStyle: { backgroundColor: colours.white },
    headerTintColor: colours.text,
  }),
});

const drawerStack = new StackNavigator({
  Drawer: { screen: drawer },
}, {
  headerMode: 'float',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default new StackNavigator({
  Login: { screen: login },
  Home: { screen: drawerStack },
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});
