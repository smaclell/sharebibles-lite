import { StyleSheet } from 'react-native';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

export default StyleSheet.create({
  createLocationContainer: {
    position: 'absolute',
    bottom: '1%',
    left: '1%',
    right: '1%',
    borderRadius: 5,
    width: '98%',
    height: '50%',
    backgroundColor: colours.white,
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  controlsContainer: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  controlButton: {
    padding: 5,
    borderRadius: 5,
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
