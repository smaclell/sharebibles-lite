import { StyleSheet } from 'react-native';
import color from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.middleBlue,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  add_members_section_container: {
    flex: 1,
    width: 360,
    padding: 10,
    backgroundColor: color.mintCream,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  add_location_section_container: {
    flex: 1,
    width: 360,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: color.mintCream,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  results_container: {
    height: 250,
    width: 360,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.mintCream,
  },

  distribution_status_container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.mintCream,
    marginBottom: 5,
    paddingTop: 10,
  },

  status_container: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: color.mintCream,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info_container: {
    height: 130,
    width: 300,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  inner_info_container: {
    height: 130,
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
    height: 130,
    width: 80,
    padding: 10,
    justifyContent: 'center',
  },

});
