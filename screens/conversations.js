import {
  Text,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/conversations';
import Conversation from '../components/Conversation';

class Conversations extends React.Component {
  static navigationOptions = {
    title: 'Conversations',
  }

  static propTypes = {
    distributions: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, marginBottom: 20 }}>Your Conversations</Text>
        <FlatList
          style={styles.inner_container}
          data={this.props.distributions}
          renderItem={({ item }) => <Conversation {...item} navigate={() => navigate('FollowUp', { conversationId: item.id })} />}
          keyExtractor={item => `conversation-${item.id}`}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  distributions: Object.keys(state.distributions).map(k => state.distributions[k]),
});

export default connect(mapStateToProps)(Conversations);
