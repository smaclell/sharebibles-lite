import {
  Text,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UploadStatus } from '../actions/uploads';
import styles from '../styles/visits';
import Visit from '../components/Visit';
import I18n from '../assets/i18n/i18n';

const Visits = ({ navigation, teamName, visits }) => {
  const { navigate } = navigation;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>{I18n.t('title/your_conversations')}</Text>
            <Text style={styles.teamName}>{teamName}</Text>
          </View>
        }
        ListEmptyComponent={
          <View>
            <Text style={styles.empty}>{I18n.t('conversations/no_visits')}</Text>
          </View>
        }
        style={styles.inner_container}
        data={visits}
        renderItem={({ item }) => <Visit {...item} navigate={() => navigate('FollowUp', { locationKey: item.locationKey })} />}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

Visits.propTypes = {
  navigation: PropTypes.object.isRequired,
  teamName: PropTypes.string.isRequired,
  visits: PropTypes.array.isRequired,
};

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
  const filteredStatus = statuses.find(s => (s.key === v.status)) || null;

  const tag = filteredTags.pop();

  return {
    ...v,
    upload: uploadMapper(uploads, v),
    initial: !!visitTags.initial,
    tag: tag ? I18n.t(tag) : null,
    status: filteredStatus,
  };
};

const unknown = {
  teamName: 'Unknown',
  visits: [],
};

const mapStateToProps = (state) => {
  const { user: userKey, users, teams } = state;
  if (!userKey || !users || !teams) {
    return unknown;
  }

  const user = users[userKey];
  if (!user) {
    return unknown;
  }

  const team = teams[user.teamKey];
  if (team) {
    return unknown;
  }

  return {
    teamName: team.name,
    visits: (state.visits.byUser[userKey] || [])
      .map(k => state.visits.all[k])
      .map(v => visitMapper(state.uploads, state.tags.followUp, state.statuses, v))
      .sort((v1, v2) => v2.created - v1.created),
  };
};

export default connect(mapStateToProps)(Visits);
