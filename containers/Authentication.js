import { connect } from 'react-redux';
import * as actions from '../actions/authentication';
import Authentication from '../screens/authentication';

function mapDispatchToProps(dispatch) {
  return {
    signIn: () => dispatch(actions.signIn()),
  };
}

export default connect(null, mapDispatchToProps)(Authentication);
