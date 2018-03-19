import { connect } from 'react-redux';
import { Constants } from 'expo';
import Settings from '../components/Settings';
import { accept, logout } from '../actions/authentication';
import { updateLocale } from '../actions/i18n';

const mapStateToProps = state => ({
  locale: state.i18n.locale, // triggers rerender on local change
  version: Constants.manifest.version,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  acceptInvite: invite => dispatch(accept(invite)),
  updateLocale: locale => dispatch(updateLocale(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
