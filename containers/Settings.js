import { connect } from 'react-redux';
import { Constants } from 'expo';
import Settings from '../components/Settings';
import { updateLocale } from '../actions/i18n';
import { pushLocalLocations } from '../actions/locations';

const mapStateToProps = state => ({
  locale: state.i18n.locale, // triggers rerender on local change
  version: Constants.manifest.version,
  connected: state.connected
});

const mapDispatchToProps = dispatch => ({
  logout: () => Promise.resolve(),
  updateLocale: locale => dispatch(updateLocale(locale)),
  pushLocations: () => dispatch(pushLocalLocations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
