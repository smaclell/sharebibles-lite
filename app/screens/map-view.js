import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
// import styles from '../styles/map-screen';
import MapView from 'react-native-maps';
import styles from '../styles/map-screen';

export default class MapsView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: 'Map',
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421 }}
      >

        <MapView.Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324 }}
          pinColor="red"
        >

          <MapView.Callout onPress={() => navigate('followUp')}>
            <View style={styles.callout_container}>
              <Image source={require('../../app/assets/logo/logo.png')} style={styles.callout_image} />
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 16 }}> Name </Text>
                <Text style={{ fontSize: 16 }}> Date of Distribution </Text>
                <Text style={{ fontSize: 16 }}> No. of Visits </Text>
              </View>
              <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}> Tap to Follow Up </Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    );
  }
}
