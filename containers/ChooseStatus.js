import { connect } from 'react-redux';
import ChooseStatus from '../components/ChooseStatus';

const mapStateToProps = state => ({
  statuses: state.statuses,
});

export default connect(mapStateToProps)(ChooseStatus);
