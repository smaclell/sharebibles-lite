import { connect } from 'react-redux';
import { Constants } from 'expo';
import Settings from '../components/Settings';

const mapStateToProps = (state, ownProps) => ({
  logout: () => {},
  team: state.teams[state.users[state.user].teamKey],
  user: state.users[state.user],
  version: Constants.manifest.version,
});

export default connect(mapStateToProps)(Settings);
