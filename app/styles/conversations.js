import { StyleSheet } from 'react-native';
import color from '../../app/constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.middleBlue,
    alignItems: 'center',
    padding: 20,
  },

  inner_container: {
    flex: 1,
    backgroundColor: color.mintCream,
    padding: 20,
    borderRadius: 15,
  },

  item: {
    height: 100,
    width: 320,
    padding: 10,
    backgroundColor: color.paleAqua,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },

  item_image: {
    height: 75,
    width: 75,
    marginLeft: 10,
    marginRight: 20,
  },

  circle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'green',
  },


});
