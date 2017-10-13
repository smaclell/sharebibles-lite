import { StyleSheet } from 'react-native';
import color from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.middleBlue,
    alignContent: 'stretch',
    flexDirection: 'column',
    padding: 10,
  },

  inner_container: {
    flex: 1,
    backgroundColor: color.mintCream,
    padding: 15,
    paddingBottom: 20,
    borderRadius: 15,
  },

  item: {
    flex: 1,
    height: 100,
    padding: 5,
    backgroundColor: color.paleAqua,
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

  uploaded: {
    backgroundColor: 'green',
  },

  pending: {
    backgroundColor: 'grey',
  },
});
