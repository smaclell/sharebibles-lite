import { StyleSheet } from 'react-native';

import colours from '../styles/colours';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colours.teals.base,
    justifyContent: 'center',
    alignItems: 'center',
  },

  callout_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colours.white,
  },

  callout_image: {
    height: 100,
    width: 150,
    margin: 10,
  },
});
