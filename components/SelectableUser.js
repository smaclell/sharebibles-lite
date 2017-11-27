import React, { PureComponent } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import User from '../components/User';

const styles = StyleSheet.create({
  user: {
    minWidth: '45%',
    margin: 5,
  },
  unselected: {
    opacity: 0.5,
  },
});

class SelectableUser extends PureComponent {
  render() {
    const { user, selected, toggleUser } = this.props;

    const style = [styles.user, !selected && styles.unselected];
    return (
      <TouchableOpacity style={style} onPress={toggleUser} opacity={0.5}>
        <User {...user} />
      </TouchableOpacity>
    );
  }
}

SelectableUser.propTypes = {
  user: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  toggleUser: PropTypes.func.isRequired,
};

export default SelectableUser;
