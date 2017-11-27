/* globals __DEV__ */
/* eslint react/prop-types: 0 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

import Settings from '../containers/Settings';

import Dev from '../screens/dev';
import FollowUp from '../screens/followUp';
import ChooseUsers from '../screens/chooseUsers';
import Tabs from './tabs';

const createGear = navigation => (
  <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => navigation.navigate('DrawerOpen')}>
    <FontAwesome size={24} name="gear" color={colours.text} />
  </TouchableOpacity>
);

const drawerScreens = {
  ChooseUsers: {
    screen: ChooseUsers,
    navigationOptions: {
      title: I18n.t('title/choose_users'),
      gesturesEnabled: false,
    },
  },
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
  contentComponent: Settings,
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

export default drawerStack;
