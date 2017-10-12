import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Navigation from './nav';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

// https://github.com/firebase/firebase-js-sdk/issues/97
// eslint-disable-next-line no-console
console.ignoredYellowBox = console.ignoredYellowBox || [];
// eslint-disable-next-line no-console
console.ignoredYellowBox = console.ignoredYellowBox.concat('Setting a timer for a long period');

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
