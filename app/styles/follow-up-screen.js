import { StyleSheet } from 'react-native';

import color from '../../app/constants/colors';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: color.middleBlue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  section1: {
    height: 80,
    width: 360,
    backgroundColor: color.mintCream,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingRight: 10,
  },

  member_image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 15,
    borderColor: 'black',
    borderWidth: 2,
  },

  section2: {
    height: 240,
    width: 360,
    backgroundColor: color.mintCream,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },

  switch_style: {
    marginBottom: 5,
  },

  section3: {
    height: 130,
    width: 360,
    backgroundColor: color.mintCream,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },

  note_input: {
    height: 110,
    width: 320,
    margin: 10,
    padding: 10,
    fontSize: 18,
  },

  options_container: {
    height: 50,
    width: 360,
    padding: 5,
    backgroundColor: 'black',
    flexDirection: 'row',
    margin: 10,
  },

  button_container: {
    height: 30,
    width: 165,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.flame,
    margin: 5,
  },

});
