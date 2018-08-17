import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import fonts from '../styles/fonts';
import colours from '../styles/colours';

const itemStyle = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: colours.black,
  },
  text: {
    fontSize: fonts.normal,
    color: colours.black,
  },
});

const renderItem = ({ item }) => (
  <View style={itemStyle.container}>
    <Text style={itemStyle.text}>{'Latitude: '}{item.latitude.toFixed(5)}</Text>
    <Text style={itemStyle.text}>{'Longitude: '}{item.longitude.toFixed(5)}</Text>
  </View>
);

const CollapsibleList = ({ data, open }) => (
  <View>
    { open &&
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    }
  </View>
);

renderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

CollapsibleList.propTypes = {
  data: PropTypes.array,
  open: PropTypes.bool.isRequired,
};

CollapsibleList.defaultProps = {
  data: [],
};

export default CollapsibleList;
