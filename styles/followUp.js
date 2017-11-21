import { StyleSheet } from 'react-native';

import colours from '../styles/colours';
import fonts from '../styles/fonts';

const containerMargin = 5;

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: colours.teals.base,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 24,
  },

  scroll: {
    flex: 0,
    flexGrow: 1,
  },

  container_heading: {
    alignItems: 'center',
    backgroundColor: colours.black,
    height: '100%',
    justifyContent: 'center',
    marginRight: 5,
    width: 15,
  },

  container_heading_text: {
    color: colours.white,
  },

  users_container: {
    alignItems: 'center',
    backgroundColor: colours.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: containerMargin,
  },

  status_container: {
    alignItems: 'flex-start',
    backgroundColor: colours.white,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    margin: containerMargin,
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
    backgroundColor: colours.white,
    flex: 1,
    flexDirection: 'row',
    flexGrow: 4,
    margin: containerMargin,
  },

  notes_container: {
    alignItems: 'flex-start',
    backgroundColor: colours.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: containerMargin,
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
    margin: containerMargin,
    padding: 5,
  },
});
