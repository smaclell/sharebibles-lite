import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './home';
import Login from './login';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

export default new StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
    transitionConfig: noTransitionConfig,
  },
});
