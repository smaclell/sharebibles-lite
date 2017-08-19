import {
  StyleSheet,
} from 'react-native';

import color from '../constants/colors';

export default StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.middleBlue,
    padding: 20,
  },

  inner_container: {
    height: 860,
    width: 350,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: color.maastBlue,
    padding: 20
  },

  logo_container: {
    height: 135,
    width: 135,
    marginBottom: 25
  },

  textinput_container: {
    height: 40,
    width: 250,
    borderRadius: 10,
    textAlign: 'center',
    color: 'black',
    backgroundColor: color.paleAqua,
    fontSize: 16,
    marginBottom: 25,
  },

  notice_container: {
    height: 200,
    width: 280,
    padding: 25,
    borderRadius: 10,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.keppel
  },

  button_container: {
    height: 40,
    width: 250,
    borderRadius: 20,
    marginBottom: 25,
    backgroundColor: color.flame,
    justifyContent: 'center',
    alignItems: 'center'
  }
});