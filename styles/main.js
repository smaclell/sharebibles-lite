import {
  StyleSheet,
} from 'react-native';

import colours from '../styles/colours';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  outer_container: {
    flex: 1,
    backgroundColor: colours.teals.base,
  },

  inner_container: {
    flex: 1,
    borderRadius: 0,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colours.teals.base,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: colours.teals.base,
  },

  header: {
    color: colours.text,
    fontSize: fonts.header,
    fontStyle: 'normal',
    marginBottom: 15,
  },

  subtitle: {
    color: colours.text,
    fontSize: fonts.large,
    fontStyle: 'normal',
    marginBottom: 20,
  },

  instructions: {
    color: colours.text,
    fontSize: fonts.normal,
    margin: 10,
    textAlign: 'center',
  },

  terms: {
    color: colours.text,
    fontSize: fonts.small,
    textAlign: 'center',
  },

  white_box: {
    backgroundColor: colours.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
    fontSize: fonts.normal,
    paddingLeft: 6,
    borderColor: colours.greys.lighter,
    borderWidth: 1,
  },

  notice_container: {
    width: 270,
    padding: 5,
    borderRadius: 0,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.greys.lightest,
  },

  login_button: {
    height: 60,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sign_in_container: {
    width: 250,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sign_up_container: {
    width: 250,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
