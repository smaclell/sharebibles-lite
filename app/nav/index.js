/* globals __DEV__ */
import { StackNavigator } from 'react-navigation';

import Authentication from '../containers/Authentication';
import Conversations from '../screens/conversations';
import Home from '../screens/home';
import Input from '../screens/input';
import MapsView from '../screens/map-view';
import Settings from '../screens/settings';
import SignUp from '../screens/sign-up';
import Dev from '../screens/dev';

const screens = {
  Authentication: { screen: Authentication },
  Home: { screen: Home },
  Input: { screen: Input },
  Settings: { screen: Settings },
  MapsView: { screen: MapsView },
  Conversations: { screen: Conversations },
  SignUp: { screen: SignUp },
};

if (__DEV__) {
  screens.Dev = { screen: Dev };
}

const Nav = StackNavigator(screens);

export default Nav;
