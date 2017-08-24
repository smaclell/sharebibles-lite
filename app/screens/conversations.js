import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from '../styles/conversations'

export default class Conversations extends React.Component {
  static navigationOptions = {
    title: 'Conversations',
  };

  render() {
    return (
      <View style={styles.container}>

        <Text style={{fontSize: 35, marginBottom: 20}}> Your Conversations </Text>

        <FlatList style={styles.inner_container}
          data={[
            {key: 'Distribution 1'},
            {key: 'Distribution 2'},
            {key: 'Distribution 3'},
            {key: 'Distribution 4'},
            {key: 'Distribution 5'},
            {key: 'Distribution 6'},
            {key: 'Distribution 7'},
          ]}

          renderItem={({item}) => 
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={require('../../app/assets/logo/logo.png')} style={styles.item_image}/>
              <View style={{marginRight: 35}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}> {item.key} </Text>
                  <Text> Date of distribution </Text>
                  <Text style={{fontSize: 16}}> Status </Text>
                </View>
              <View style={styles.circle}>
                </View>
            </View>
          </TouchableOpacity>}/>

      </View>  
    );
  }
}
