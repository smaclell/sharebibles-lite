import { StyleSheet } from 'react-native';
import colours from '../styles/colours';

const containerMargin = 10;

export default StyleSheet.create({
  container: {
    backgroundColor: colours.teals.base,
    padding: 10,
    paddingTop: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,
  },

  scroll: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 0,
  },

  add_members_section_container: {
    flex: 1,
    backgroundColor: colours.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: containerMargin,
  },

  add_location_section_container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colours.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: containerMargin,
  },

  results_container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.white,
    marginBottom: containerMargin,
  },

  tag_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  resource_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },

  actions_container: {
    flex: 0,
    backgroundColor: colours.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    flexDirection: 'row',
  },
});
