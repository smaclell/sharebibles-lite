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

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
