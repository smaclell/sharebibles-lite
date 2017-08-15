import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#72C8D8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImage: {
    height: 150,
    width: 150,
    margin: 30,
  },

  inner_Container: {
    backgroundColor: '#F4FAFA',
    padding: 20,
    margin: 40,
    flexGrow: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userPass_TextBox: {
    padding: 10,
    margin: 10,
    height: 45,
    width: 270,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 20,
    borderColor: '#3D94A3',
    borderWidth: 2,
  },

  button: {
    margin: 30,
    height: 45,
    width: 270,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#E4572E',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
