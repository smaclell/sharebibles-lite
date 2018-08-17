import { React, PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from '../assets/i18n/i18n';
import Icon from '../components/Icon';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import { UploadStatus, setUploadingStatus } from '../actions/uploads';
import { pushLocalLocations } from '../actions/locations';
import { requestPushPermission } from '../actions/permissions';
import CollapsibleList from '../components/CollapsibleList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    fontSize: fonts.large,
    paddingVertical: 10,
    backgroundColor: colours.greys.lighter,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colours.black,
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
    this.setState({ numberUploading: this.props.stats.offline });
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

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <TouchableOpacity onPress={this.uploadLocations}>{I18n.t('settings/push_locations')}</TouchableOpacity>
        </View>
        { uploading &&
          <View style={styles.section}>
            <Text>{I18n.t('locations/uploading')}{`: ${numberUploading - stats.offline}/${numberUploading}`}</Text>
          </View>
        }
        { !uploading &&
          <View style={styles.section}>
            <Text>{I18n.t('locations/offline')}{`: ${stats.offline}`}</Text>
          </View>
        }
        <View style={styles.section}>
          <Icon size="medium" family="entypo" name={iconName} colour={colours.black} />
          <TouchableOpacity onPress={this.onFailedPressed}>
            <Text>{I18n.t('locations/Failed_upload')}{`: ${stats.failed}`}</Text>
          </TouchableOpacity>
        </View>
        {stats.failed > 0 &&
          <CollapsibleList
            data={failedLocations}
            open={failedOpen}
          />
        }
      </View>
    );
  }
}

LocationData.propTypes = {
  failedLocations: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
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
  failedLocations: {},
};

const mapStateToProps = (state) => {
  const failedLocations = {};
  const stats = {
    [UploadStatus.pending]: 0,
    [UploadStatus.offline]: 0,
    [UploadStatus.failed]: 0,
    [UploadStatus.uploaded]: 0,
  };

  Object.entries(state.uploads).forEach(([key, v]) => {
    stats[v] += 1;
    if (v === UploadStatus.failed) {
      failedLocations[key] = state.locations[key];
    }
  });

  return {
    stats,
    failedLocations,
    uploading: state.uploads.uploading,
  };
};

const mapDispatchToProps = dispatch => ({
  pushLocations: () => dispatch(pushLocalLocations()),
  requestPushPermission: () => dispatch(requestPushPermission()),
  setUploadingStatus: () => dispatch(setUploadingStatus()),
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
          dispatchProps.setUploadingStatus(true);
          dispatchProps.pushLocations();
        }
      });
  };

  return props;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LocationData);
