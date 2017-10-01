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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.mintCream,
    marginBottom: containerMargin,
  },

  distribution_status_container: {
    alignItems: 'flex-start',
    backgroundColor: color.mintCream,
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 5,
  },

  info_container: {
    height: 110,
    width: 300,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  inner_info_container: {
    height: 70,
    width: 280,
    justifyContent: 'center',
  },

  options_container: {
    height: 30,
    width: 360,
    flexDirection: 'row',
    padding: 2,
    margin: 2,
  },

  switch_container: {
    height: 70,
    width: 80,
    padding: 10,
    justifyContent: 'center',
  },

  actions_container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
});
