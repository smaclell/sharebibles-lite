/* eslint react/prop-types: 0 */
import React from 'react';
import { Platform, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

// Sorted Alphabetically
import Initial from '../screens/initial';
import OverviewMap from '../screens/overviewMap';
import Visits from '../screens/visits';

const iconSize = 30;
const tabHeight = 50;

const initialStyle = {
  flex: 1,
  height: 1.5 * tabHeight,
  marginTop: -0.5 * tabHeight,
  paddingTop: 20,
  paddingLeft: 25,
  paddingRight: 25,
  paddingBottom: Platform.OS === 'ios' ? 35 : undefined,
  backgroundColor: colours.primaryButton,
};

const navigator = new TabNavigator({
  OverviewMap: {
    screen: OverviewMap,
    navigationOptions: {
      tabBarLabel: I18n.t('title/map'),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="map-marker" size={iconSize} color={tintColor} />
      ),
    },
  },
  Initial: {
    screen: Initial,
    navigationOptions: {
      title: I18n.t('initial/first_visit'),
      tabBarVisible: false,
      style: {
        height: tabHeight,
        backgroundColor: 'black',
      },
      tabStyle: {
        height: 1.5 * tabHeight,
        padding: 0,
        backgroundColor: 'black',
      },
      tabBarIcon: () => (
        <View style={initialStyle}>
          <FontAwesome name="plus" size={40} color={colours.white} />
        </View>
      ),
    },
  },
  Visits: {
    screen: Visits,
    navigationOptions: {
      title: I18n.t('title/your_conversations'),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="list" size={iconSize} color={tintColor} />
      ),
    },
  },
}, {
  lazy: true,
  animationEnabled: true,
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

export default navigator;
