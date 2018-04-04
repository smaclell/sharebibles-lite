import { StyleSheet } from 'react-native';
import colours from '../styles/colours';

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  callout_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
    backgroundColor: colours.white,
  },

  row: {
    marginHorizontal: 10,

    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  col: {
    marginHorizontal: 10,
    width: '100%',
    flexDirection: 'column',
    flex: 1,
  },

  statusHeader: {
    fontSize: 20,
    padding: 0,
    margin: 0,
  },

  subHeading: {
    minWidth: '35%',
    marginRight: 5,
  },

  value: {
    fontSize: 15,
    marginVertical: 10,
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: colours.greys.lighter,
  },
});
