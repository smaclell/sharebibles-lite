import {
  Text,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/locations';
import Location from '../components/Location';
import I18n from '../assets/i18n/i18n';

const Locations = ({ navigation, locations }) => {
  const { navigate } = navigation;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>{I18n.t('title/your_conversations')}</Text>
          </View>
        }
        ListEmptyComponent={
          <View>
            <Text style={styles.empty}>{I18n.t('conversations/no_visits')}</Text>
          </View>
        }
        style={styles.inner_container}
        data={locations}
        renderItem={({ item }) => <Location {...item} navigate={() => navigate('FollowUp', { locationKey: item.locationKey })} />}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

Locations.propTypes = {
  navigation: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
};

const uploadMapper = (uploads, location) => uploads[location.key];

const mapper = (uploads, statuses, location) => {
  const filteredStatus = statuses.find(s => (s.key === location.status)) || null;

  return {
    ...location,
    upload: uploadMapper(uploads, location),
    initial: true,
    status: filteredStatus,
  };
};

const mapStateToProps = state => ({
  locations: Object.values(state.locations)
    .map(x => mapper(state.uploads, state.statuses, x))
    .sort((x1, x2) => x2.created - x1.created),
});

export default connect(mapStateToProps)(Locations);
