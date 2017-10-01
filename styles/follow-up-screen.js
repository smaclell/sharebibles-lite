import { StyleSheet } from 'react-native';

import color from '../constants/colors';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: color.middleBlue,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },

  container_heading: {
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    marginRight: 15,
    width: 15,
  },

  container_heading_text: {
    color: colours.white,
  },

  users_container: {
    alignItems: 'center',
    backgroundColor: color.mintCream,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
    paddingRight: 10,
  },

  tags_container: {
    alignItems: 'center',
    backgroundColor: color.mintCream,
    flex: 1,
    flexDirection: 'row',
    flexGrow: 2,
    margin: 10,
  },

  switch_style: {
    marginBottom: 5,
  },

  notes_container: {
    alignItems: 'flex-start',
    backgroundColor: color.mintCream,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
  },

  note_input: {
    alignSelf: 'stretch',
    flex: 1,
    fontSize: fonts.normal,
    margin: 10,
    padding: 10,
  },

  actions_container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    margin: 10,
    padding: 5,
  },
});
