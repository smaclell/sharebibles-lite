import { StyleSheet } from 'react-native';

import color from '../../app/constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: color.middleBlue,
  },

  inner_Container: {
    height: 570,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.maastBlue,
    padding: 20,
    borderRadius: 20,
  },

  logo_container: {
    height: 140,
    width: 140,
    marginBottom: 25,
  },
});
