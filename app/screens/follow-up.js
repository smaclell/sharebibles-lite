import React from 'react';
import { View,
  TouchableOpacity,
  Text,
  Switch,
  TextInput } from 'react-native';
import styles from '../styles/follow-up-screen';


export default class followUp extends React.Component {
    static navigationOptions = {
      title: 'Follow Up',
    }
    render() {
      return (
        <View style={styles.container}>

          <View style={styles.section1}>
            <View style={{ height: 100, width: 15, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ color: 'white' }}> 1 </Text>
            </View>

            <View style={styles.member_image}>
              <Text> 1 </Text>
            </View>

            <View style={styles.member_image}>
              <Text> 2 </Text>
            </View>
          </View>


          <View style={styles.section2}>

            <View style={{ height: 250, width: 15, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}> 2 </Text>
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


          <View style={styles.section3}>
            <View style={{ height: 150, width: 15, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}> 3 </Text>
            </View>
            <TextInput
              style={styles.note_input}
              placeholder="Add notes..."
              multiline
            />
          </View>


          <View style={styles.options_container}>
            <TouchableOpacity style={styles.button_container}>
              <Text style={{ color: 'white', fontSize: 16 }}> UPDATE </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_container}>
              <Text style={{ color: 'white', fontSize: 16 }}> CANCEL </Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
}
