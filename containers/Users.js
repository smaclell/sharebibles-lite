import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as visitorActions from '../actions/visitors';
import Users from '../components/Users';
import sorter from '../utils/userSorter';

const mapStateToProps = state => ({
  user: state.user,
  visitors: state.visitors.map(v => state.users[v]).sort(sorter),
});

const mapDispatchToProps = dispatch => bindActionCreators(visitorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
