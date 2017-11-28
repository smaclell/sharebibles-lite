import { StyleSheet } from 'react-native';

import colours from '../styles/colours';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: colours.teals.base,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 24,
  },

  scroll: {
    padding: 5,
    flex: 0,
    flexGrow: 1,
  },

  users_container: {
    flex: 1,
  },

  status_container: {
    flex: 1,
  },

  accepted_container: {
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },

  tags_container: {
    alignItems: 'center',
    flex: 1,
    flexGrow: 4,
  },

  notes_container: {
    flex: 1,
  },

  note_input: {
    alignSelf: 'stretch',
    flex: 1,
    fontSize: fonts.normal,
    margin: 10,
    padding: 10,
  },

  actions_container: {
    backgroundColor: colours.black,
    flex: 0,
    flexDirection: 'row',
    padding: 5,
  },
});
