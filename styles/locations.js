import { StyleSheet } from 'react-native';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.teals.base,
    alignContent: 'stretch',
    flexDirection: 'column',
    padding: 10,
  },

  inner_container: {
    flex: 1,
    backgroundColor: colours.white,
    padding: 15,
    paddingBottom: 20,
    borderRadius: 0,
  },

  header: {
    fontSize: fonts.header,
    color: colours.text,
    marginBottom: 5,
  },

  empty: {
    fontSize: fonts.large,
    color: colours.text,
  },

  item: {
    flex: 1,
    height: 100,
    padding: 5,
    backgroundColor: colours.greys.lightest,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item_image: {
    height: 75,
    width: 75,
    margin: 10,
  },

  circle: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },

  status_circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: colours.black,
  },

});
