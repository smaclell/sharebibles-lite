import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Onboarding from '../components/Onboarding';
import * as onboardingActions from '../actions/onboarding';

const mapStateToProps = state => ({
  ...state.onboarding,
  regionKey: state.authentication.regionKey || null,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(onboardingActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
