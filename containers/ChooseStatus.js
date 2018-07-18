import { connect } from 'react-redux';
import ChooseStatus from '../components/ChooseStatus';

const mapStateToProps = state => ({
  locale: state.i18n.locale, // triggers rerender on local change
  statuses: state.statuses,
});

export default connect(mapStateToProps)(ChooseStatus);
