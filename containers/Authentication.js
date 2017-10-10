import { connect } from 'react-redux';
import * as actions from '../actions/authentication';
import Authentication from '../screens/authentication';

function mapDispatchToProps(dispatch) {
  return {
    signIn: (email, password) => dispatch(actions.signIn(email, password)),
  };
}

export default connect(null, mapDispatchToProps)(Authentication);
