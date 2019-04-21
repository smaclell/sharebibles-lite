/* eslint react/prop-types: 0 */
import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

import Settings from '../containers/Settings';
import OverviewMap from '../screens/overviewMap';
import Invites from '../screens/invites';
import LocationData from '../screens/locationData';
import Icon from '../components/Icon';

const createHeader = (name, onPress) => (
  <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={onPress}>
    <Icon size="medium" family="font-awesome" name={name} colour={colours.black} />
  </TouchableOpacity>
);

const createHeaderTitle = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image style={{ height: 20, width: 160 }} source={require('../assets/icons/shareBibles-header.png')} />
  </View>
);

const drawerScreens = {
  OverviewMap,
};

const drawer = createDrawerNavigator(drawerScreens, {
  headerMode: 'float',
  drawerLockMode: 'locked-closed',
  initialRouteName: 'OverviewMap',
  contentComponent: Settings,
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: colours.white },
    headerTintColor: colours.text,
  },
});

// Using a function to allow language changes to immediately update titles
const drawerStack = createStackNavigator(
  {
    Drawer: {
      screen: drawer,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('title/share_bibles'),
        headerTitle: createHeaderTitle(),
        headerLeft: createHeader('bars', () => navigation.toggleDrawer()),
        headerRight: <View />,
      }),
    },
    Invites: {
      screen: Invites,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('title/accept_invites'),
        headerLeft: createHeader('chevron-left', () => navigation.goBack(null)),
      }),
    },
    LocationData: {
      screen: LocationData,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('title/location_data'),
        headerLeft: createHeader('chevron-left', () => navigation.goBack(null)),
      }),
    },
  },
  {
    headerMode: 'float',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default drawerStack;
