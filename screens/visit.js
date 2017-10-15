import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as visitActions from '../actions/visits';
import Button from '../components/Button';
import Switch from '../components/Switch';
import User from '../components/User';
import styles from '../styles/visit';

class Visit extends React.Component {
    static navigationOptions = {
      title: 'Follow Up',
    }

    static propTypes = { // Sorted Alphabetically
      createVisit: PropTypes.func.isRequired,
      navigation: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      tags: PropTypes.array.isRequired,
      user: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);
      this.state = {
        notes: null,
        tags: {},
      };

      this.showTag = this.showTag.bind(this);
    }

    showTag(tag) {
      return (
        <Switch
          key={tag.key}
          onChange={enabled => this.updateTag(tag.key, enabled)}
          value={!!this.state.tags[tag.key]}
        >
          {tag.label}
        </Switch>
      );
    }

    update() {
      const { notes, tags } = this.state;

      this.props.createVisit({ location: this.props.location, notes, tags });
      this.props.navigation.goBack();
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
        <KeyboardAvoidingView style={styles.container} behavior="padding">

          <View style={styles.users_container}>
            <View style={styles.container_heading}>
              <Text style={styles.container_heading_text}> 1 </Text>
            </View>

            <User {...this.props.user} />
          </View>

          <View style={styles.tags_container}>
            <View style={styles.container_heading}>
              <Text style={styles.container_heading_text}> 2 </Text>
            </View>

            <View style={{ flex: 1, margin: 10 }}>
              { this.props.tags.map(this.showTag) }
            </View>
          </View>

          <View style={styles.notes_container}>
            <View style={styles.container_heading}>
              <Text style={styles.container_heading_text}> 3 </Text>
            </View>
            <TextInput
              style={styles.note_input}
              placeholder="Add notes..."
              returnKeyType="next"
              multiline
              onChangeText={notes => this.setState(p => ({ ...p, notes }))}
            />
          </View>

          <View style={styles.actions_container}>
            <Button onClick={() => this.update()}>UPDATE</Button>
            <Button onClick={() => this.props.navigation.goBack()}>CANCEL</Button>
          </View>

        </KeyboardAvoidingView>
      );
    }
}

const mapStateToProps = (state, ownProps) => ({
  location: state.locations[ownProps.navigation.state.params.locationKey],
  tags: state.tags.visit,
  user: state.users[state.user],
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(visitActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Visit);
