/* eslint react/prop-types: 0 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

import Settings from '../containers/Settings';

import OverviewMap from '../screens/overviewMap';
import FollowUp from '../screens/followUp';
import Icon from '../components/Icon';

const createGear = navigation => (
  <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => navigation.navigate('DrawerOpen')}>
    <Icon size="medium" family="font-awesome" name="bars" colour={colours.black} />
  </TouchableOpacity>
);

const drawerScreens = {
  OverviewMap: {
    screen: OverviewMap,
  },
};

const drawer = new DrawerNavigator(drawerScreens, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
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
const drawerStack = new StackNavigator({
  Drawer: {
    screen: drawer,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('title/share_bibles'),
      headerLeft: createGear(navigation),
    }),
  },
  FollowUp: {
    screen: FollowUp,
    navigationOptions: () => ({
      title: I18n.t('components/follow_up'),
    }),
  },
}, {
  headerMode: 'float',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default drawerStack;
