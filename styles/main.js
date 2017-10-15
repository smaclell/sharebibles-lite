import {
  StyleSheet,
} from 'react-native';

import color from '../constants/colors';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: color.middleBlue,
  },

  inner_container: {
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: color.maastBlue,
  },

  logo_container: {
    marginBottom: 20,
  },

  logo: {
    width: 135,
    height: 135,
    marginBottom: 20,
  },

  textinput_container: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    textAlign: 'center',
    color: 'black',
    backgroundColor: color.paleAqua,
    marginBottom: 20,
    fontSize: fonts.large,
  },

  login_button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sign_up_container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
