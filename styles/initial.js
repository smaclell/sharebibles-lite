import { StyleSheet } from 'react-native';
import colours from '../styles/colours';

const containerMargin = 10;

export default StyleSheet.create({
  container: {
    backgroundColor: colours.teals.base,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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

  status_container: {
    alignItems: 'flex-start',
    backgroundColor: colours.white,
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 0,
  },

  info_container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  switch_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    margin: 2,
  },

  resource_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 2,
    margin: 2,
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
