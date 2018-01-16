import React from 'react';
import {
  Alert,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sentry from 'sentry-expo';
import * as visitActions from '../actions/visits';
import KeyboardScroll from '../components/KeyboardScroll';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import ChooseStatus from '../containers/ChooseStatus';
import Notes from '../components/Notes';
import Section from '../components/Section';
import Switch from '../components/Switch';
import Users from '../containers/Users';
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
    createVisit: PropTypes.func.isRequired,
    currentStatus: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = createInitialState();
  }

  onFocus = event => this.scroll.onFocus(event)

  showTag = tag => (
    <Switch
      key={tag.key}
      onChange={enabled => this.updateTag(tag.key, enabled)}
      value={!!this.state.tags[tag.key]}
    >
      {I18n.t(tag.label)}
    </Switch>
  );

  goBack = () => {
    this.props.navigation.goBack();
    this.setState(createInitialState());
  }

  // eslint-disable-next-line consistent-return
  update = async () => {
    const { params: { locationKey } } = this.props.navigation.state;
    const { notes, tags, status } = this.state;

    if ((notes || '').trim() === '' && status === 'need') {
      return Alert.alert(
        I18n.t('validation/no_notes_title'),
        I18n.t('validation/no_notes_message'),
        [{ text: I18n.t('button/ok'), onPress() {} }],
        { cancelable: false },
      );
    }

    try {
      await this.props.createVisit({ locationKey, notes, tags, status });

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

  updateTag(tagKey, enabled) {
    this.setState(p => ({
      ...p,
      tags: {
        ...p.tags,
        [tagKey]: enabled,
      },
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardScroll
          ref={(r) => {
            this.scroll = r;
          }}
          style={styles.scroll}
        >
          <Section style={styles.users_container} order={1}>
            <Users showUpdateUsers={() => this.props.navigation.navigate('ChooseUsers')} />
          </Section>

          <Section style={styles.status_container} order={2}>
            {
              this.props.currentStatus && this.props.currentStatus.success ?
                <View style={styles.accepted_container}>
                  <VisitStatus status={this.props.currentStatus} />
                </View> :
                <ChooseStatus updateStatus={this.updateStatus} />
            }
          </Section>

          <Section style={styles.tags_container} order={3}>
            <View style={{ flex: 1, margin: 10 }}>
              { this.props.tags.map(this.showTag) }
            </View>
          </Section>

          <Notes
            sectionNumber={4}
            onFocus={this.onFocus}
            onChangeText={notes => this.setState(p => ({ ...p, notes }))}
          />
        </KeyboardScroll>
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
  tags: state.tags.followUp,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(visitActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowUp);
