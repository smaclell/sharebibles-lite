import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';
import I18n from '../assets/i18n/i18n';
import fonts from '../styles/fonts';
import colours from '../styles/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colours.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingLeft: 10,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
  },
  mapContainer: {
    paddingLeft: 10,
  },
  map: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: fonts.normal,
    color: colours.black,
  },
  error: {
    color: colours.reds.base,
    paddingTop: 5,
  },
});

const initialLatitudeDelta = 0.00200012;
const initialLongitudeDelta = 0.00200006;
const offset = 0.00010000;

const FailedListItem = ({ item: { error, key, location: { latitude, longitude } }, onPress }) => {
  const region = {
    latitude: latitude + offset, // Keeps pin in view (Small map)
    longitude,
    latitudeDelta: initialLatitudeDelta,
    longitudeDelta: initialLongitudeDelta,
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(longitude, latitude)} key={key}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          mapType="hybrid"
          provider="google"
          cacheEnabled
          showsTraffic={false}
          showsIndoors={false}
          showsBuildings={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsMyLocationButton={false}
        >
          <MapView.Marker
            coordinate={{
              latitude,
              longitude,
            }}
            pinColor="red"
            opacity={0.8}
          />
        </MapView>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{I18n.t('locations/latitude', { value: latitude.toFixed(5) })}</Text>
        <Text style={styles.text}>{I18n.t('locations/longitude', { value: longitude.toFixed(5) })}</Text>
        <Text style={styles.error}>{error ? I18n.t(error) : I18n.t('locations/unknown_error') }</Text>
      </View>
    </TouchableOpacity>
  );
};

FailedListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FailedListItem;
