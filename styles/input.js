import { StyleSheet } from 'react-native';
import color from '../constants/colors';

const containerMargin = 10;

export default StyleSheet.create({
  container: {
    backgroundColor: color.middleBlue,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  add_members_section_container: {
    flex: 1,
    backgroundColor: color.mintCream,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: containerMargin,
  },

  add_location_section_container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.mintCream,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: containerMargin,
  },

  results_container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.mintCream,
    marginBottom: containerMargin,
  },

  status_container: {
    alignItems: 'flex-start',
    backgroundColor: color.mintCream,
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
});
