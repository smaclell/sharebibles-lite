import { StackNavigator } from 'react-navigation';

// Sorted Alphabetically
import Authentication from '../containers/Authentication';
import Dev from '../screens/dev';
import Home from '../screens/home';
import Input from '../screens/input';
import Locations from '../screens/locations';
import MapsView from '../screens/map-view';
import Settings from '../screens/settings';
import SignUp from '../screens/sign-up';
import Visit from '../screens/visit';

// Sorted Alphabetically
const screens = {
  Authentication: { screen: Authentication },
  Dev: { screen: Dev },
  Home: { screen: Home },
  Input: { screen: Input },
  Locations: { screen: Locations },
  MapsView: { screen: MapsView },
  Settings: { screen: Settings },
  SignUp: { screen: SignUp },
  Visit: { screen: Visit },
};

const Nav = StackNavigator(screens);

export default Nav;
