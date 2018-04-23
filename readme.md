# Get started

[![Run Status](https://api.shippable.com/projects/59a3023bcf8c1407003521c5/badge?branch=master)](https://app.shippable.com/github/IanEdington/sharebibles)
[![Coverage Badge](https://api.shippable.com/projects/59a3023bcf8c1407003521c5/coverageBadge?branch=master)](https://app.shippable.com/github/IanEdington/sharebibles)

1. In order to run this app make sure you can run the [react-native base app](https://facebook.github.io/react-native/docs/getting-started.html) building projects with native code.

    1. brew install node

    2. brew install watchman

    3. brew install npm

    4. npm install -g react-native-cli

2. Ensure you have `yarn` installed, i.e. `brew install yarn`

3. Run `yarn global add exp` to install the expo commandline tool

4. Within the sharebibles directory run `yarn install`

4. Run `yarn start` or `yarn run android` or `yarn run ios`

5. Using the expo app on your phone see the awesomeness you have created!

Create a card on the trello board if this does not work for you.

# Publishing

See [Expo Docs](https://docs.expo.io/versions/v26.0.0/guides/building-standalone-apps.html) on Standalone apps

```
exp build:android --release-channel prod-v1
exp build:ios --release-channel prod-v1
``

Please publish to the `prod-v1` channel. If you need to change the standalone application please update this message to use the next prod version, i.e. `prod-v2`.
