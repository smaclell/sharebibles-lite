import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from '../assets/i18n/i18n';
import Icon from '../components/Icon';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import { UploadStatus } from '../actions/uploads';
import { pushLocalLocations } from '../actions/locations';
import { requestPushPermission } from '../actions/permissions';
import FailedListItem from '../components/FailedListItem';
import { getStats, getFailedLocations } from '../selectors/stats';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  button: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colours.black,
    backgroundColor: colours.greys.lightest,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  first: {
    borderTopWidth: 1,
  },
  section: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colours.greys.lightest,
    borderBottomWidth: 1,
    borderColor: colours.black,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: fonts.large,
  },
});

class LocationData extends PureComponent {
  state = {
    failedOpen: false,
    numberUploading: 0,
  }

  onFailedPressed = () => {
    this.setState(p => ({ failedOpen: !p.failedOpen }));
  }

  uploadLocations = () => {
    this.setState({ numberUploading: this.props.stats.offline + this.props.stats.failed });
    this.props.showPushDialog();
  }

  render() {
    const {
      failedLocations,
      stats,
      uploading,
    } = this.props;
    const {
      failedOpen,
      numberUploading,
    } = this.state;

    const iconName = failedOpen ? 'chevron-small-down' : 'chevron-small-right';
    const disabled = stats.offline === 0 && stats.failed === 0;
    const progress = numberUploading - stats.offline;
    const offlineTotal = stats.offline + stats.failed;

    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.button} disabled={disabled} onPress={this.uploadLocations}>
            <Text style={styles.sectionText}>{I18n.t('settings/push_locations')}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.section, styles.first]}>
          { uploading && <Text style={styles.sectionText}>{I18n.t('locations/uploading', { value: progress, total: numberUploading })}</Text> }
          { !uploading && <Text style={styles.sectionText}>{I18n.t('locations/offline', { value: offlineTotal })}</Text> }
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{I18n.t('locations/successful_upload', { value: stats.uploaded })}</Text>
        </View>
        <TouchableOpacity style={styles.section} onPress={this.onFailedPressed}>
          <Icon size="medium" family="entypo" name={iconName} colour={colours.black} />
          <Text style={styles.sectionText}>{I18n.t('locations/failed_upload', { value: stats.failed })}</Text>
        </TouchableOpacity>
        {stats.failed > 0 && failedOpen &&
          <FlatList
            data={failedLocations}
            renderItem={FailedListItem}
          />
        }
      </View>
    );
  }
}

LocationData.propTypes = {
  failedLocations: PropTypes.array,
  showPushDialog: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    pending: PropTypes.number.isRequired,
    offline: PropTypes.number.isRequired,
    failed: PropTypes.number.isRequired,
    uploaded: PropTypes.number.isRequired,
  }).isRequired,
  uploading: PropTypes.bool.isRequired,
};

LocationData.defaultProps = {
  failedLocations: [],
};

const mapStateToProps = (state) => {
  let failedLocations = {};
  // const stats = {
  //   [UploadStatus.pending]: getStats(state, UploadStatus.pending),
  //   [UploadStatus.offline]: getStats(state, UploadStatus.offline),
  //   [UploadStatus.failed]: getStats(state, UploadStatus.failed),
  //   [UploadStatus.uploaded]: getStats(state, UploadStatus.uploaded),
  // };
  const stats = {
    [UploadStatus.pending]: 0,
    [UploadStatus.offline]: 0,
    [UploadStatus.failed]: 0,
    [UploadStatus.uploaded]: 0,
  };

  Object.entries(state.uploads).forEach(([key, v]) => {
    stats[v] += 1;
    if (v === UploadStatus.failed && state.locations[key]) {
      failedLocations[key] = state.locations[key];
    }
  });

  failedLocations = Object.values(failedLocations);

  return {
    connected: state.connected,
    stats,
    // failedLocations: getFailedLocations(state),
    failedLocations,
    uploading: state.uploads.uploading,
  };
};

const mapDispatchToProps = dispatch => ({
  pushLocations: () => dispatch(pushLocalLocations()),
  requestPushPermission: () => dispatch(requestPushPermission()),
});

const mergeProps = (stateProps, dispatchProps) => {
  const props = Object.assign({}, stateProps, dispatchProps);

  props.showPushDialog = () => {
    if (!stateProps.connected) {
      Alert.alert(
        I18n.t('button/offline'),
        I18n.t('connectivity/action_requires_connection'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
      return;
    }

    dispatchProps.requestPushPermission()
      .then((allowed) => {
        if (allowed) {
          dispatchProps.pushLocations();
        }
      });
  };

  return props;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LocationData);
