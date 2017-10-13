import {
  Text,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/locations';
import fonts from '../styles/fonts';
import Visit from '../components/Visit';

class Visits extends React.Component {
  static navigationOptions = {
    title: 'Your Conversations',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    teamName: PropTypes.string.isRequired,
    visits: PropTypes.array.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: fonts.header, marginBottom: 20 }}>Your Conversations</Text>
        <Text style={{ fontSize: fonts.large, marginBottom: 10 }}>{this.props.teamName}</Text>
        <FlatList
          style={styles.inner_container}
          data={this.props.visits}
          renderItem={({ item }) => <Visit {...item} navigate={() => navigate('Visit', { locationKey: item.key })} />}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }
}

const visitMapper = (tags, v) => {
  const visitTags = v.tags || {};
  const filteredTags = tags.filter(t => visitTags[t.key]).map(t => t.label);
  return {
    ...v,
    tag: filteredTags.length > 0 ? filteredTags[filteredTags.length - 1] : null,
  };
};

const mapStateToProps = state => ({
  teamName: state.teams[state.users[state.user].teamKey].name,
  visits: (state.visits.byUser[state.user] || [])
    .map(k => state.visits.all[k])
    .map(v => visitMapper(state.tags.visit, v))
    .sort((v1, v2) => v2.created - v1.created),
});

export default connect(mapStateToProps)(Visits);
