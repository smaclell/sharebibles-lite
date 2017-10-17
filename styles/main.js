import {
  StyleSheet,
} from 'react-native';

import color from '../constants/colors';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: color.teal,
  },

  white_box: {
    backgroundColor: color.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inner_container: {
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: color.teal,
  },

  logo_container: {
    marginBottom: 20,
  },

  logo: {
    height: 80,
    width: 80,
  },

  textinput_container: {
    width: '100%',
    height: 40,
    width: 250,
    borderRadius: 0,
    textAlign: 'center',
    color: 'black',
    backgroundColor: color.white,
    marginBottom: 22,
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 6,
    borderColor: color.lightGray,
    borderWidth: 1
  },

  login_button: {
    height: 60,
    width: 250,
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
