import { StyleSheet } from 'react-native';
import colours from '../styles/colours';

export default StyleSheet.create({
  container: {
    backgroundColor: colours.teals.base,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,
  },

  scroll: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 0,
  },

  add_members_section_container: {
    flex: 1,
  },

  add_location_section_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  results_outer_container: {
    flex: 1,
  },

  results_inner_container: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
