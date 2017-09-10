import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Navigation from './nav';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

AppRegistry.registerComponent('sharebibles', () => App);

export default App;
