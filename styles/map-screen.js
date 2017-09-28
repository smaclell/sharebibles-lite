import { StyleSheet } from 'react-native';

import color from '../constants/colors';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: color.middleBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  callout_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: color.mintCream,
  },

  callout_image: {
    height: 100,
    width: 150,
    margin: 10,
  },
});
