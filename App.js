import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading, Constants, Font } from 'expo';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Sentry from 'sentry-expo';
import thunk from 'redux-thunk';

import Onboarding from './containers/Onboarding';
import Navigation from './nav';
import reducer from './reducers';
import { createDatabases } from './apis/database';
import { initialize } from './apis';
import { restore } from './actions/authentication';
import { setup } from './actions/connectivity';
import I18n from './assets/i18n/i18n';
import * as overviewActions from './actions/overview';
import * as positionActions from './actions/position';
import { restoreLocalLocations } from './actions/locations';
import { restoreOnboardingStatus } from './actions/onboarding';
import * as settingsActions from './actions/settings';

Sentry.config('https://b3f49b97fd1045d0b76429a73baf0396@sentry.io/1193850').install();

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
      createDatabases(),
      I18n.initAsync(),
      store.dispatch(positionActions.initialize()),
      store.dispatch(settingsActions.load({
        enableInvitations: Constants.manifest.extra.enableInvitations,
      })),
    ]).then(() => {
      I18n.setDateLocale();
      this.setState({ isReady: true });
      return Promise.all([
        store.dispatch(restore()).then((restored) => {
          if (!restored) {
            return Promise.resolve();
          }

          return store.dispatch(overviewActions.initialize());
        }),
        store.dispatch(restoreLocalLocations()),
        store.dispatch(restoreOnboardingStatus()),
      ]);
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
