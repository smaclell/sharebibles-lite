import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Authentication from './screens/authentication';
import Conversations from './screens/conversations';
import Home from './screens/home';
import Input from './screens/input';
import MapView from './screens/map-view';
import Settings from './screens/settings';
import SignUp from './screens/sign-up';

const App = StackNavigator({
  Authentication: { screen: Authentication },
  Home: { screen: Home },
  Input: { screen: Input },
  Settings: { screen: Settings },
  MapView: { screen: MapView },
  Conversations: { screen: Conversations },
  SignUp : {screen: SignUp}
});

AppRegistry.registerComponent('sharebibles', () => App);
