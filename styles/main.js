import {
  StyleSheet,
} from 'react-native';

import color from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.black,
  },

  white_box: {
    backgroundColor: color.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inner_container: {
    height: 580,
    width: 340,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.teal,
  },

  logo_container: {
    height: 80,
    width: 80,
    marginBottom: 20,
  },

  textinput_container: {
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
    height: 40,
    width: 250,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.orange
  },
});
