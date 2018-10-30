# ShareBibles Lite

[![CircleCI](https://circleci.com/gh/smaclell/sharebibles-lite/tree/master.svg?style=svg)](https://circleci.com/gh/smaclell/sharebibles-lite/tree/master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/smaclell/sharebibles-lite/blob/master/CODE_OF_CONDUCT.md)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This is a mobile application to help share the Bible throughout the world.

[Android](https://play.google.com/store/apps/details?id=com.faithtech.sharebibles_lite)
[iOS](https://itunes.apple.com/us/app/share-bibles-lite/id1375368792?ls=1&mt=8)

# Get started

1. To run this app make sure you can run the [react-native base app](https://facebook.github.io/react-native/docs/getting-started.html) building projects with native code.

    1. brew install node
    2. brew install watchman
    3. brew install npm
    4. npm install -g react-native-cli

2. Ensure you have `yarn` installed, i.e. `brew install yarn` or https://yarnpkg.com/en/docs/install
3. Install all the dependencies using `yarn install`
4. Install the [expo cli](https://docs.expo.io/versions/latest/introduction/installation.html) `yarn global add expo-cli`
5. Start the project by running `expo start` in the project
6. Create an account on `expo.io` and sign into the expo app on your device
7. Using the expo app on your phone see the awesomeness you have created! (Android, take a picture of your QR code and for iOS send yourself a link)

Bonus: If you want to try out a simple change, open the `colours.js` file, change a few values like black and white then reload the application.

Create a card on the trello board if this does not work for you.

# Contributing

We maintain an active backlog of new features and bugs we would love your help with on [Trello](https://trello.com/b/KtIsfEZp/sharebibles-lite).

Have a great idea or change you want to share? Awesome. We actively welcome pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

We have adopted a [Code of Conduct]((https://github.com/smaclell/sharebibles-lite/blob/master/CODE_OF_CONDUCT.md)) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

# Publishing

See [Expo Docs](https://docs.expo.io/versions/v26.0.0/guides/building-standalone-apps.html) on Standalone apps

```
exp build:android --release-channel prod-v1
exp build:ios --release-channel prod-v1
```

Please publish to the `prod-v1` channel. If you need to change the standalone application please update this message to use the next prod version, i.e. `prod-v2`.

# License

This project is [Apache 2.0](https://github.com/smaclell/sharebibles-lite/blob/master/LICENSE.md) Licensed. We also provide an additional patent grant.
