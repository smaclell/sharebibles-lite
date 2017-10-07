import {
  Text,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/locations';
import fonts from '../styles/fonts';
import Location from '../components/Location';

class Locations extends React.Component {
  static navigationOptions = {
    title: 'Conversations',
  }

  static propTypes = {
    locations: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: fonts.header, marginBottom: 20 }}>Your Conversations</Text>
        <FlatList
          style={styles.inner_container}
          data={this.props.locations}
          renderItem={({ item }) => <Location {...item} navigate={() => navigate('Visit', { locationId: item.id })} />}
          keyExtractor={item => `location-${item.id}`}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: Object.keys(state.locations).map(k => state.locations[k]),
});

export default connect(mapStateToProps)(Locations);
