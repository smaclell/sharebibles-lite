import React from 'react';
import {
  View,
  Text,
  Switch,
  TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as visitActions from '../actions/visits';
import User from '../components/User';
import Button from '../components/Button';
import styles from '../styles/visit';

class Visit extends React.Component {
    static navigationOptions = {
      title: 'Follow Up',
    }

    static propTypes = {
      createVisit: PropTypes.func.isRequired,
      navigation: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);
      this.state = {
        notes: null,
      };
    }

    update() {
      const { params: { locationKey } } = this.props.navigation.state;
      // TODO: Tags
      this.props.createVisit({ locationKey, notes: this.state.notes });
      this.props.navigation.goBack();
    }

    render() {
      return (
        <View style={styles.container}>

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

            <View style={{ margin: 20, marginRight: 30 }}>
              <Text style={{ fontSize: 14, fontStyle: 'italic', margin: 10 }}>Someone at this home... </Text>
              <Text style={{ fontSize: 16, margin: 5, fontWeight: 'bold' }}> Received Prayer </Text>
              <Text style={{ fontSize: 16, margin: 5, fontWeight: 'bold' }}> Read the Bible </Text>
              <Text style={{ fontSize: 16, margin: 5, fontWeight: 'bold' }}> Understood the Gospel </Text>
              <Text style={{ fontSize: 16, margin: 5, fontWeight: 'bold' }}> Joined Descipleship Group </Text>
              <Text style={{ fontSize: 16, margin: 5, fontWeight: 'bold' }}> Received Baptism </Text>
            </View>

            <View style={{ height: 110 }}>
              <Switch style={styles.switch_style} />
              <Switch style={styles.switch_style} />
              <Switch style={styles.switch_style} />
              <Switch style={styles.switch_style} />
              <Switch style={styles.switch_style} />
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

        </View>
      );
    }
}

const mapStateToProps = state => ({
  user: state.users[state.user],
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(visitActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Visit);
