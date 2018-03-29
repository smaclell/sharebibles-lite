import { StyleSheet } from 'react-native';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  createLocationContainer: {
    position: 'absolute',
    bottom: 2,
    left: '1%',
    right: '1%',
    borderRadius: 2,
    width: '98%',
    height: '50%',
    backgroundColor: colours.white,
    zIndex: 1,
  },

  results_inner_container: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  resource_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
