import { StyleSheet } from 'react-native';

import color from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: color.middleBlue,
  },

  inner_Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: color.maastBlue,
    padding: 20,
    borderRadius: 20,
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
    color: color.mintCream,
    fontSize: 35,
    margin: 5,
    marginBottom: 25,
    textAlign: 'center',
  },
});
