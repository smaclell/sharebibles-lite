import { React } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import fonts from '../styles/fonts';

const itemStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: fonts.normal,
  },
});

const renderItem = item => (
  <View style={itemStyle.container}>
    <Text style={itemStyle.text}>{item.latitude}</Text>
  </View>
);

const CollapsibleList = ({ data, open }) => {
  const style = {
    flex: open && 1,
    height: !open && 0,
    paddingLeft: 10,
  };

  return (
    <View style={style}>
      <FlatList
        data={Object.values(data)}
        renderItem={renderItem}
      />
    </View>
  );
};

CollapsibleList.propTypes = {
  data: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  open: PropTypes.bool.isRequired,
};

CollapsibleList.defaultProps = {
  data: {},
};

export default CollapsibleList;
