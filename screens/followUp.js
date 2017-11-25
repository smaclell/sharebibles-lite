import React from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as visitActions from '../actions/visits';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import ChooseStatus from '../containers/ChooseStatus';
import VisitStatus from '../components/VisitStatus';
import Switch from '../components/Switch';
import User from '../components/User';
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
    statuses: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = createInitialState();
  }

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

  update = () => {
    const { params: { locationKey } } = this.props.navigation.state;
    const { notes, tags, status } = this.state;

    this.props.createVisit({ locationKey, notes, tags, status });
    this.goBack();
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
        <KeyboardAwareScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.users_container}>
            <View style={styles.container_heading}>
              <Text style={styles.container_heading_text}> 1 </Text>
            </View>
            <User {...this.props.user} />
          </View>

          <View style={styles.status_container}>
            <View style={styles.container_heading}>
              <Text style={styles.container_heading_text}> 2 </Text>
            </View>

            {
              this.props.currentStatus && this.props.currentStatus.success ?
                <View style={styles.accepted_container}>
                  <VisitStatus status={this.props.currentStatus} />
                </View> :
                <ChooseStatus updateStatus={this.updateStatus} />
            }
          </View>

          <View style={styles.tags_container}>
            <View style={styles.container_heading}>
              <Text style={styles.container_heading_text}> 3 </Text>
            </View>
            <View style={{ flex: 1, margin: 10 }}>
              { this.props.tags.map(this.showTag) }
            </View>
          </View>

          <View style={styles.notes_container}>
            <View style={styles.container_heading}>
              <Text style={styles.container_heading_text}> 4 </Text>
            </View>
            <TextInput
              style={styles.note_input}
              placeholder={I18n.t('follow_up/add_notes')}
              multiline
              numberOfLines={5}
              maxLength={1000}
              autoGrow
              maxHeight={90}
              onChangeText={notes => this.setState(p => ({ ...p, notes }))}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.actions_container}>
          <PrimaryButton onClick={this.update}>{I18n.t('button/update')}</PrimaryButton>
          <SecondaryButton onClick={this.goBack}>{I18n.t('button/cancel')}</SecondaryButton>
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
  statuses: state.statuses,
  tags: state.tags.followUp,
  user: state.users[state.user],
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(visitActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowUp);
