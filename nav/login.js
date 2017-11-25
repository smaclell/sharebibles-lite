import { StackNavigator } from 'react-navigation';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import I18n from '../assets/i18n/i18n';

const navigator = new StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null,
      title: I18n.t('title/sign_in'),
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
      title: I18n.t('title/sign_up'),
    },
  },
}, {
  headerMode: 'none',
});

export default navigator;
