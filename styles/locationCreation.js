import { StyleSheet } from 'react-native';
import colours from './colours';
import fonts from './fonts';

export default StyleSheet.create({
  createLocationContainer: {
    width: '100%',
    height: '100%',
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

  saveButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: colours.blues.base,
    borderWidth: 1,
  },

  saveButtonDisabled: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: colours.blues.lighter,
    borderWidth: 1,
  },

  buttonText: {
    fontSize: fonts.large,
    color: colours.black,
  },

  buttonTextDisabled: {
    fontSize: fonts.large,
    color: colours.greys.lighter,
  },

  resultsInnerContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  resourceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
