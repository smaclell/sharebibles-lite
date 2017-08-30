import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Authentication from './screens/authentication';
import Conversations from './screens/conversations';
import Home from './screens/home';
import Input from './screens/input';
import MapsView from './screens/map-view';
import Settings from './screens/settings';
import SignUp from './screens/sign-up';

import reducer from './reducers';

const Naviation = StackNavigator({
  Authentication: { screen: Authentication },
  Home: { screen: Home },
  Input: { screen: Input },
  Settings: { screen: Settings },
  MapsView: { screen: MapsView },
  Conversations: { screen: Conversations },
  SignUp: { screen: SignUp },
});

const initialState = {
  user: {
    name: 'Rob Wiebe',
    email: '',
    oAuth: 'secret',
  },
  team: [
    {
      name: 'Sean Braacx',
    },
    {
      name: 'Ian Edington',
    },
    {
      name: 'ZhuoJue Lee',
    },
    {
      name: 'Zafar Siddiqi',
    },
    {
      name: 'Scott MacLellan',
    },
  ],
  households: [
    {
      name: 'HouseHold 1',
    },
    {
      name: 'HouseHold 2',
    },
    {
      name: 'HouseHold 3',
    },
    {
      name: 'HouseHold 4',
    },
    {
      name: 'HouseHold 5',
    },
    {
      name: 'HouseHold 6',
    },
    {
      name: 'HouseHold 7',
    },
    {
      name: 'HouseHold 8',
    },
    {
      name: 'HouseHold 9',
    },
    {
      name: 'HouseHold 10',
    },
  ],
};

const store = createStore(reducer, initialState);

const App = () => (
  <Provider store={store}>
    <Naviation />
  </Provider>
);

AppRegistry.registerComponent('sharebibles', () => App);

export default App;
