import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from '../assets/i18n/i18n';
import Icon from '../components/Icon';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import { pushLocalLocations } from '../actions/locations';
import { requestPushPermission } from '../actions/permissions';
import { showPushDialog } from '../actions/settings';
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

class LocationData extends Component {
  state = {
    numberUploading: 0,
  }

  uploadLocations = () => {
    this.setState({ numberUploading: this.props.stats.offline + this.props.stats.failed });
    this.props.showPushDialog();
  }

  renderItem = ({ item }) => (
    <FailedListItem
      item={item}
      onPress={this.props.goToPin}
    />
  )

  render() {
    const {
      failedLocations,
      stats,
      uploading,
    } = this.props;
    const {
      numberUploading,
    } = this.state;

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
        <View style={styles.section}>
          <Icon size="medium" family="entypo" name="chevron-small-down" colour={colours.black} />
          <Text style={styles.sectionText}>{I18n.t('locations/failed_upload', { value: stats.failed })}</Text>
        </View>
        <FlatList
          data={failedLocations}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

LocationData.propTypes = {
  failedLocations: PropTypes.array,
  goToPin: PropTypes.func.isRequired,
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

const mapStateToProps = state => ({
  connected: state.connected,
  stats: getStats(state),
  failedLocations: getFailedLocations(state),
  uploading: state.uploads.uploading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  pushLocations: () => dispatch(pushLocalLocations()),
  requestPushPermission: () => dispatch(requestPushPermission()),
  showPushDialog: () => dispatch(showPushDialog()),
  goToPin: (longitude, latitude) => ownProps.navigation.navigate('OverviewMap', { coord: { longitude, latitude } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationData);
