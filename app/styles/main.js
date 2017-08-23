import {
  StyleSheet,
} from 'react-native';

import color from '../constants/colors';

export default StyleSheet.create({
container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.middleBlue,
  },
  
  inner_container: {
    height: 580,
    width: 340,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.maastBlue,
  },

  logo_container: {
    height: 135,
    width: 135,
    marginBottom: 20,
  },

  textinput_container: {
    height: 40,
    width: 250,
    borderRadius: 10,
    textAlign: 'center',
    color: 'black',
    backgroundColor: color.paleAqua,
    marginBottom: 22,
    fontSize: 16,
  },

  login_button: {
    height: 40,
    width: 250,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.crayolaGreen,
  }
});
