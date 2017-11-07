import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as visitActions from '../actions/visits';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import Status from '../components/Status';
import Switch from '../components/Switch';
import User from '../components/User';
import styles from '../styles/followUp';
import I18n from '../assets/i18n/i18n';


class FollowUp extends React.Component {
  static propTypes = { // Sorted Alphabetically
    createVisit: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    statuses: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      status: 'unknown',
      tags: {},
    };

    this.showTag = this.showTag.bind(this);
    this.showStatus = this.showStatus.bind(this);
  }

  showStatus(status) {
    return (
      <Status
        key={status.key}
        label={I18n.t(status.label)}
        onPressed={() => this.updateStatus(status.key)}
        selected={this.state.status === status.key}
        icon={status.icon}
      />
    );
  }

  showTag(tag) {
    return (
      <Switch
        key={tag.key}
        onChange={enabled => this.updateTag(tag.key, enabled)}
        value={!!this.state.tags[tag.key]}
      >
        {I18n.t(tag.label)}
      </Switch>
    );
  }

  update() {
    const { params: { locationKey } } = this.props.navigation.state;
    const { notes, tags, status } = this.state;

    this.props.createVisit({ locationKey, notes, tags, status });
    this.props.navigation.goBack();
  }

  updateStatus(value) {
    this.setState(p => ({ ...p, status: value }));
  }

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
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
          <ScrollView showsVerticalScrollIndicator={false}>

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

              {this.props.statuses.map(this.showStatus) }
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
                numberOfLines={3}
                onChangeText={notes => this.setState(p => ({ ...p, notes }))}
              />
            </View>

            <View style={styles.actions_container}>
              <PrimaryButton onClick={() => this.update()}>{I18n.t('button/update')}</PrimaryButton>
              <SecondaryButton onClick={() => this.props.navigation.goBack()}>{I18n.t('button/cancel')}</SecondaryButton>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.statuses,
  tags: state.tags.followUp,
  user: state.users[state.user],
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(visitActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowUp);
