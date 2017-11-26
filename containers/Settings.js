import { Share } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { NavigationActions } from 'react-navigation';
import Settings from '../components/Settings';
import I18n from '../assets/i18n/i18n';
import * as authenticationActions from '../actions/authentication';

const dialogOptions = {
  dialogTitle: I18n.t('settings/shareInvite'),
};

const createLogout = ({ navigation }) => () => {
  // This will reset back to loginStack
  // https://github.com/react-community/react-navigation/issues/1127
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    key: null, // black magic
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
  });

  navigation.dispatch(actionToDispatch);
};

const mapStateToProps = state => ({
  team: state.teams[state.users[state.user].teamKey],
  user: state.users[state.user],
  version: Constants.manifest.version,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(authenticationActions.signOut()).then(createLogout(ownProps)),
  shareInvite: () =>
    dispatch(authenticationActions.shareInvite())
      .then(options => Share.share(options, dialogOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
