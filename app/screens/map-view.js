import React from 'react';
// import styles from '../styles/map-screen';
import MapView from 'react-native-maps';

export default class MapsView extends React.Component {
  static navigationOptions = {
    title: 'Map',
  }

  render() {
    return (
      <MapView
        style={{width: 100, height: 200, margin: 40 }}
      />
    );
  }
}
