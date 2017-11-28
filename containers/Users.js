import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as visitorActions from '../actions/visitors';
import Users from '../components/Users';
import sorter from '../utils/userSorter';

const mapStateToProps = (state) => {
  const visitors = state.visitors.map(v => state.users[v]);
  visitors.sort(sorter);

  return {
    user: state.user,
    visitors,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(visitorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
