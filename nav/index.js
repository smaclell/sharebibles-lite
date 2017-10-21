import { StackNavigator, TabNavigator } from 'react-navigation';

// Sorted Alphabetically
import Authentication from '../containers/Authentication';
import Dev from '../screens/dev';
import Initial from '../screens/initial';
import MapsView from '../screens/map-view';
import SignUp from '../screens/sign-up';
import FollowUp from '../screens/followUp';
import Visits from '../screens/visits';

const login = new StackNavigator({
  SignIn: { screen: Authentication },
  SignUp: { screen: SignUp },
});

const map = new StackNavigator({
  MapsView: { screen: MapsView },
  FollowUp: { screen: FollowUp },
}, {
  headerMode: 'none',
});

const visits = new StackNavigator({
  Visits: { screen: Visits },
  FollowUp: { screen: FollowUp },
}, {
  headerMode: 'none',
});

const home = new TabNavigator({
  Dev: { screen: Dev },
  MapsView: { screen: map },
  Initial: { screen: Initial },
  Visits: { screen: visits },
}, {
  lazy: true,
  animationEnabled: true,
  headerMode: 'none',
  tabBarPosition: 'bottom',
  order: ['MapsView', 'Initial', 'Visits'],
  swipeEnabled: false,
  initialRouteName: 'MapsView',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      height: 60,
      backgroundColor: 'black',
    },
    iconStyle: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabStyle: {
      height: 60,
      padding: 0,
      backgroundColor: 'black',
    },
  },
});

export default new StackNavigator({
  Login: { screen: login },
  Home: { screen: home },
});
