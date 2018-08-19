/* eslint react/prop-types: 0 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

import Settings from '../containers/Settings';

import OverviewMap from '../screens/overviewMap';
import Invites from '../screens/invites';
import Icon from '../components/Icon';

const createHeader = (name, onPress) => (
  <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={onPress}>
    <Icon size="medium" family="font-awesome" name={name} colour={colours.black} />
  </TouchableOpacity>
);

const drawerScreens = {
  OverviewMap,
};

const drawer = createDrawerNavigator(drawerScreens, {
  headerMode: 'float',
  drawerLockMode: 'locked-closed',
  initialRouteName: 'OverviewMap',
  contentComponent: Settings,
  navigationOptions: {
    headerStyle: { backgroundColor: colours.white },
    headerTintColor: colours.text,
  },
});

// Using a function to allow language changes to immediately update titles
const drawerStack = createStackNavigator({
  Drawer: {
    screen: drawer,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('title/share_bibles'),
      headerLeft: createHeader('bars', () => navigation.toggleDrawer()),
    }),
  },
  Invites: {
    screen: Invites,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('title/accept_invites'),
      headerLeft: createHeader('chevron-left', () => navigation.goBack(null)),
    }),
  },
}, {
  headerMode: 'float',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default drawerStack;
