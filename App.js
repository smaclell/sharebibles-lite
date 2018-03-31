import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Sentry from 'sentry-expo';
import thunk from 'redux-thunk';

import Navigation from './nav';
import reducer from './reducers';
import { createDatabase } from './apis/database';
import { initialize } from './apis';
import { restore } from './actions/authentication';
import { setup } from './actions/connectivity';
import I18n from './assets/i18n/i18n';
import * as positionActions from './actions/position';
import { restoreLocalLocations } from './actions/locations';

Sentry.config('https://c054fcaae0394f1fa64d85f2860e04c7@sentry.io/271508').install();

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

class App extends Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    Promise.all([
      ...this.loadFontsAsync(),
      createDatabase(),
      store.dispatch(positionActions.initialize()),
      store.dispatch(restore()),
      I18n.initAsync(),
    ]).then(() => {
      I18n.setDateLocale();
      this.setState({ isReady: true });
      return store.dispatch(restoreLocalLocations());
    });
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
    throw error;
  }

  async loadFontsAsync() {
    const fonts = [FontAwesome.font, Entypo.font, Feather.font];
    return fonts.map(Font.loadAsync);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading />
      );
    }

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </View>
      </Provider>
    );
  }
}

export default App;
