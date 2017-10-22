import {
  Text,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { UploadStatus } from '../actions/uploads';
import styles from '../styles/visits';
import fonts from '../styles/fonts';
import Visit from '../components/Visit';

class Visits extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Your Conversations',
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="list" size={40} color={tintColor} />
    ),
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
          renderItem={({ item }) => <Visit {...item} navigate={() => navigate('FollowUp', { locationKey: item.key })} />}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }
}

const uploadMapper = (uploads, v) => {
  const location = uploads[v.locationKey];
  const visit = uploads[v.key];

  if (location === UploadStatus.failed || visit === UploadStatus.failed) {
    return UploadStatus.failed;
  }

  if (location === UploadStatus.pending || visit === UploadStatus.pending) {
    return UploadStatus.pending;
  }

  return UploadStatus.uploaded;
};

const visitMapper = (uploads, tags, statuses, v) => {
  const visitTags = v.tags || {};
  const filteredTags = tags.filter(t => visitTags[t.key]).map(t => t.label);
  const filteredStatus = statuses.find(s => (s.key === v.status)) || {};
  return {
    ...v,
    upload: uploadMapper(uploads, v),
    initial: !!visitTags.initial,
    tag: filteredTags.pop(),
    status: filteredStatus.label,
  };
};

const mapStateToProps = state => ({
  teamName: state.teams[state.users[state.user].teamKey].name,
  visits: (state.visits.byUser[state.user] || [])
    .map(k => state.visits.all[k])
    .map(v => visitMapper(state.uploads, state.tags.followUp, state.statuses, v))
    .sort((v1, v2) => v2.created - v1.created),
});

export default connect(mapStateToProps)(Visits);
