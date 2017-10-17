import { StyleSheet } from 'react-native';

import colours from '../styles/colours';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.teals.base,
  },

  inner_Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: colours.white,
    padding: 20,
    borderRadius: 0,
  },

  logo_container: {
    marginBottom: 25,
    alignItems: 'center',
  },

  logo: {
    height: 140,
    width: 140,
  },

  welcome: {
    color: colours.teals.base,
    fontSize: 35,
    margin: 5,
    marginBottom: 25,
    textAlign: 'center',
  },
});
