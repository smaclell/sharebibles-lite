import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Navigation from './nav';
import reducer from './reducers';
import initialState from './reducers/initial-state';

const store = createStore(reducer, initialState);

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

AppRegistry.registerComponent('sharebibles', () => App);

export default App;
