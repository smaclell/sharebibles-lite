import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as locationActions from '../actions/locations';
import LocationCreation from '../components/LocationCreation';

const mapStateToProps = (state) => ({
  resources: Object.values(state.resources),
  isOnboarded: state.onboarding.isOnboarded,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(locationActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationCreation);
