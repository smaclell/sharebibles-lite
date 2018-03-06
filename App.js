import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { AppLoading, Font } from 'expo';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Sentry from 'sentry-expo';
import thunk from 'redux-thunk';

import Navigation from './nav';
import reducer from './reducers';

import * as actions from './actions/authentication';
import { initialize } from './apis';
import { setup } from './actions/connectivity';
import I18n from './assets/i18n/i18n';

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

const paddingTop = Platform.select({
  ios: 0,
  android: StatusBar.currentHeight,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.loadAssetsAsync();
  }
  
  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
    throw error;
  }

  async updateState() {
    this.setState({ isReady: true });
  }

  async loadAssetsAsync() {
    const fonts = [FontAwesome.font, Entypo.font];

    const cacheFonts = fonts.map(font => Font.loadAsync(font));
    await Promise.all([...cacheFonts, I18n.initAsync()]);
    
    await store.dispatch(actions.restoreSignIn(() => this.updateState()));
    I18n.setDateLocale();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading />
      );
    }

    return (
      <Provider store={store}>
        <View style={{ flex: 1, paddingTop }}>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </View>
      </Provider>
    );
  }
}

export default App;
