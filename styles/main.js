import {
  Platform, StyleSheet,
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
    flexShrink: 0,
    flexGrow: 1,
    borderRadius: 0,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: colours.teals.base,
  },

  container: {
    flex: 1,
    paddingTop: Platform.select({ android: 0, ios: 20 }),
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: colours.white,
  },

  header_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  header: {
    color: colours.text,
    fontSize: fonts.header,
    fontStyle: 'normal',
    marginBottom: 15,
  },

  subtitle: {
    textAlign: 'center',
    color: colours.text,
    fontSize: fonts.large,
    fontStyle: 'normal',
  },

  instructions: {
    color: colours.text,
    fontSize: fonts.normal,
    marginBottom: 10,
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
    padding: 20,
    borderRadius: 0,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: colours.greys.lightest,
  },

  login_button: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loading: {
    paddingLeft: 5,
  },

  link_container: {
    margin: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
