import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from '../assets/i18n/i18n';
import Icon from '../components/Icon';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import { pushLocalLocations } from '../actions/locations';
import { showPushDialog } from '../actions/settings';
import FailedListItem from '../components/FailedListItem';
import { getStats, getFailedLocations } from '../selectors/stats';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: colours.greys.lighter,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colours.white,
  },
  button: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colours.black,
    backgroundColor: colours.white,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colours.white,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: fonts.large,
  },
  listHeading: {
    borderBottomWidth: 1,
    borderColor: colours.greys.lighter,
    paddingBottom: 10,
    marginBottom: 5,
  },
  listHeadingText: {
    paddingLeft: 5,
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

    const offlineTotal = stats.offline + stats.failed;
    const disabled = offlineTotal === 0;
    const progress = numberUploading - stats.offline;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} disabled={disabled} onPress={this.uploadLocations}>
          <Text style={styles.sectionText}>{I18n.t('locationData/Upload_locations')}</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          { uploading && <Text style={styles.sectionText}>{I18n.t('locationData/uploading', { value: progress, total: numberUploading })}</Text> }
          { !uploading && <Text style={styles.sectionText}>{I18n.t('locationData/offline', { value: offlineTotal })}</Text> }
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>{I18n.t('locationData/successful_upload', { value: stats.uploaded })}</Text>
        </View>
        <View style={[styles.section, styles.listHeading]}>
          <Icon size="medium" family="entypo" name="chevron-small-down" colour={colours.black} />
          <Text style={[styles.sectionText, styles.listHeadingText]}>{I18n.t('locationData/failed_upload', { value: stats.failed })}</Text>
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
  connected: state.connectivity.connected,
  stats: getStats(state),
  failedLocations: getFailedLocations(state),
  uploading: state.uploads.uploading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  pushLocations: () => dispatch(pushLocalLocations()),
  showPushDialog: () => dispatch(showPushDialog()),
  goToPin: (longitude, latitude) => ownProps.navigation.navigate('OverviewMap', { coord: { longitude, latitude } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationData);
