import {
  StyleSheet,
} from 'react-native';

import colours from '../styles/colours';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  notice_container: {
    height: 200,
    width: 280,
    padding: 25,
    borderRadius: 10,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.greys.lightest,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: colours.teals.base,
  },

  white_box: {
    backgroundColor: colours.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inner_container: {
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colours.teals.base,
  },

  logo_container: {
    marginBottom: 20,
  },

  logo: {
    height: 80,
    width: 80,
  },

  textinput_container: {
    height: 40,
    width: 250,
    borderRadius: 0,
    textAlign: 'left',
    color: 'black',
    backgroundColor: colours.white,
    marginBottom: 22,
    fontSize: fonts.normal,
    paddingLeft: 6,
    borderColor: colours.greys.lighter,
    borderWidth: 1,
  },

  login_button: {
    height: 60,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sign_up_container: {
    width: 250,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
