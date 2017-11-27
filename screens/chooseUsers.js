// Visitors reducer, just user keys
// Keep around the last values
// Separate screen to pick/remove via opacity.

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import partition from 'lodash/partition';
import * as visitorActions from '../actions/visitors';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import SelectableUser from '../components/SelectableUser';
import I18n from '../assets/i18n/i18n';
import colours from '../styles/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search_container: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    maxWidth: 250,
  },
  users_container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  actions_container: {
    backgroundColor: colours.black,
    flex: 0,
    flexDirection: 'row',
    padding: 5,
  },
});

class ChooseUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      users: this.props.users,
      visitors: this.props.visitors,
    };

    this.togglers = {};
  }

  getToggler = (user) => {
    this.togglers[user.key] = this.togglers[user.key] || (() => this.toggleUser(user));
    return this.togglers[user.key];
  }

  // eslint-disable-next-line arrow-body-style
  toggle = (key, array) => {
    return array.includes(key) ?
      array.filter(x => x !== key) :
      array.concat(key);
  }

  toggleUser = ({ key }) => {
    this.setState(p => ({
      ...p,
      visitors: this.toggle(key, p.visitors),
    }));
  }

  showUser = (user, selected) => (
    <SelectableUser
      key={user.key}
      user={user}
      selected={selected}
      toggleUser={this.getToggler(user)}
    />
  )

  showUsers = (users, selected) => (users.map(u => this.showUser(u, selected)))

  goBack = () => {
    this.props.goBack();
  }

  update = () => {
    this.props.update(this.state.visitors);
    this.goBack();
  }

  render() {
    let users = this.props.users;
    if (this.state.filter !== '') {
      users = users.filter(u => u.name.toUpperCase().includes(this.state.filter));
    }

    const [selected, unselected] = partition(
      users,
      u => this.state.visitors.includes(u.key),
    );

    return (
      <View style={styles.container}>
        <View style={styles.search_container}>
          <TextInput
            style={styles.search}
            placeholder={I18n.t('chooseUsers/search')}
            onChangeText={filter => this.setState({ filter: filter.trim().toUpperCase() })}
          />
        </View>
        <ScrollView styles={styles.users_container} contentContainerStyle={styles.users_container}>
          { this.showUsers(selected, true) }
          { this.showUsers(unselected, false) }
        </ScrollView>
        <View style={styles.actions_container}>
          <PrimaryButton onClick={this.update}>{I18n.t('button/update')}</PrimaryButton>
          <SecondaryButton onClick={this.goBack}>{I18n.t('button/cancel')}</SecondaryButton>
        </View>
      </View>
    );
  }
}

ChooseUsers.propTypes = {
  goBack: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  visitors: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: Object.values(state.users),
  visitors: state.visitors,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(visitorActions, dispatch),
  goBack: ownProps.navigation.goBack,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUsers);
