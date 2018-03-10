import { connect } from 'react-redux';
import { Constants } from 'expo';
import Settings from '../components/Settings';
import { updateLocale } from '../actions/i18n';

const mapStateToProps = state => ({
  locale: state.i18n.locale, // triggers rerender on local change
  version: Constants.manifest.version,
});

const mapDispatchToProps = dispatch => ({
  logout: () => Promise.resolve(),
  updateLocale: locale => dispatch(updateLocale(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
