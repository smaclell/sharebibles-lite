import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Navigation from './nav';
import reducer from './reducers';

import { initialize } from './apis';
import { setup } from './actions/connectivity';

initialize();

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

store.dispatch(setup());

// https://github.com/firebase/firebase-js-sdk/issues/97
// eslint-disable-next-line no-console
console.ignoredYellowBox = console.ignoredYellowBox || [];
// eslint-disable-next-line no-console
console.ignoredYellowBox = console.ignoredYellowBox.concat('Setting a timer for a long period');

const paddingTop = Platform.select({
  ios: 0,
  android: StatusBar.currentHeight,
});

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1, paddingTop }}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </View>
  </Provider>
);

export default App;
