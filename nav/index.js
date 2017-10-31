import { StackNavigator, TabNavigator } from 'react-navigation';

// Sorted Alphabetically
import Dev from '../screens/dev';
import FollowUp from '../screens/followUp';
import Initial from '../screens/initial';
import OverviewMap from '../screens/overviewMap';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import Visits from '../screens/visits';

const login = new StackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
});

const home = new TabNavigator({
  Dev: { screen: Dev },
  OverviewMap: { screen: OverviewMap },
  Initial: { screen: Initial },
  Visits: { screen: Visits },
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
  FollowUp: { screen: FollowUp },
});
