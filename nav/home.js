/* eslint react/prop-types: 0 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

import Settings from '../containers/Settings';

import FollowUp from '../screens/followUp';
import Tabs from './tabs';
import DrawerButton from '../components/DrawerButton';

const createGear = navigation => (
  <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => navigation.navigate('DrawerOpen')}>
    <DrawerButton />
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

const drawer = new DrawerNavigator(drawerScreens, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  headerMode: 'float',
  drawerLockMode: 'locked-closed',
  initialRouteName: 'Tabs',
  contentComponent: Settings,
  navigationOptions: {
    gesturesEnabled: false,
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
