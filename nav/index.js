/* eslint react/prop-types: 0 */
import React from 'react';
import { View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

// Sorted Alphabetically
import Dev from '../screens/dev';
import FollowUp from '../screens/followUp';
import Initial from '../screens/initial';
import OverviewMap from '../screens/overviewMap';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import Visits from '../screens/visits';

const login = new StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: I18n.t('title/sign_in'),
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: I18n.t('title/sign_up'),
      header: null,
    },
  },
});

const iconSize = 30;
const tabHeight = 50;

const home = new TabNavigator({
  Dev: {
    screen: Dev,
    navigationOptions: {
      title: 'Developer Testing Screen',
    },
  },
  OverviewMap: {
    screen: OverviewMap,
    navigationOptions: {
      header: null,
      tabBarLabel: I18n.t('title/map'),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="map-marker" size={iconSize} color={tintColor} />
      ),
    },
  },
  Initial: {
    screen: Initial,
    navigationOptions: {
      header: null,
      tabBarLabel: I18n.t('initial/first_visit'),
      tabBarVisible: false,
      tabBarIcon: () => (
        <View style={{ padding: 20, paddingBottom: 35, backgroundColor: colours.primaryButton }}>
          <FontAwesome name="plus" size={40} color={colours.white} />
        </View>
      ),
    },
  },
  Visits: {
    screen: Visits,
    navigationOptions: {
      header: null,
      tabBarLabel: I18n.t('title/your_conversations'),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="list" size={iconSize} color={tintColor} />
      ),
    },
  },
}, {
  lazy: true,
  animationEnabled: true,
  headerMode: 'none',
  tabBarPosition: 'bottom',
  order: ['OverviewMap', 'Initial', 'Visits'],
  swipeEnabled: false,
  initialRouteName: 'OverviewMap',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      height: tabHeight,
      backgroundColor: 'black',
    },
    iconStyle: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabStyle: {
      height: tabHeight,
      padding: 0,
      backgroundColor: 'black',
    },
  },
});

export default new StackNavigator({
  Login: { screen: login },
  Home: { screen: home },
  FollowUp: {
    screen: FollowUp,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
});
