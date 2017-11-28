// Visitors reducer, just user keys
// Keep around the last values
// Separate screen to pick/remove via opacity.

import React, { PureComponent } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import User from '../components/User';
import UpdateUsers from '../components/UpdateUsers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  scroll: {
    flex: 0,
  },
  inner: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  update: {
    justifyContent: 'flex-end',
  },
});

class Users extends PureComponent {
  constructor(props) {
    super(props);

    this.togglers = {
      [props.user]: () => {},
    };
  }

  getToggler = (user) => {
    let toggler = this.togglers[user.key];
    if (!toggler) {
      toggler = () => this.props.toggleVistor(user.key);
    }

    this.togglers[user.key] = toggler;
    return toggler;
  }

  showVistor = vistor => (
    <TouchableOpacity key={vistor.key} onPress={this.getToggler(vistor)}>
      <User {...vistor} />
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          styles={styles.scroll}
          contentContainerStyle={styles.inner}
          horizontal
        >
          <UpdateUsers show={this.props.showUpdateUsers} />
          { this.props.visitors.map(this.showVistor) }
        </ScrollView>
      </View>
    );
  }
}

Users.propTypes = {
  showUpdateUsers: PropTypes.func.isRequired,
  toggleVistor: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  visitors: PropTypes.array.isRequired,
};

export default Users;
