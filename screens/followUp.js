import React from 'react';
import {
  Alert,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sentry from 'sentry-expo';
import * as locationActions from '../actions/locations';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import ChooseStatus from '../containers/ChooseStatus';
import Section from '../components/Section';
import VisitStatus from '../components/VisitStatus';
import styles from '../styles/followUp';
import I18n from '../assets/i18n/i18n';

function createInitialState() {
  return {
    notes: null,
    status: 'unknown',
    tags: {},
  };
}

class FollowUp extends React.Component {
  static defaultProps = { // Sorted Alphabetically
    currentStatus: null,
  }

  static propTypes = { // Sorted Alphabetically
    updateLocation: PropTypes.func.isRequired,
    currentStatus: PropTypes.object,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = createInitialState();
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.setState(createInitialState());
  }

  // eslint-disable-next-line consistent-return
  update = async () => {
    const { params: { locationKey } } = this.props.navigation.state;
    const { status } = this.state;

    try {
      await this.props.updateLocation({ key: locationKey, status });

      this.goBack();
    } catch (err) {
      Sentry.captureException(err, { extra: { locationKey, status } });

      Alert.alert(
        I18n.t('validation/unknown_error_title'),
        I18n.t('validation/unknown_error_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }
  }

  updateStatus = status => this.setState({ status });

  render() {
    return (
      <View style={styles.container}>
        <Section style={styles.status_container} order={1}>
          {
            this.props.currentStatus && this.props.currentStatus.success ?
              <View style={styles.accepted_container}>
                <VisitStatus status={this.props.currentStatus} />
              </View> :
              <ChooseStatus updateStatus={this.updateStatus} />
          }
        </Section>
        <View style={styles.actions_container}>
          <PrimaryButton style={{ margin: 10 }} onClick={this.update}>{I18n.t('button/update')}</PrimaryButton>
          <SecondaryButton style={{ margin: 10 }} onClick={this.goBack}>{I18n.t('button/cancel')}</SecondaryButton>
        </View>
      </View>
    );
  }
}

function getLocationStatus({ locations, statuses }, { navigation: { state } }) {
  if (!state && !state.params) {
    return null;
  }

  const { params: { locationKey } } = state;
  const location = locations[locationKey];
  if (!location) {
    return null;
  }

  return statuses.find(s => s.key === location.status);
}

const mapStateToProps = (state, ownProps) => ({
  currentStatus: getLocationStatus(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(locationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowUp);
