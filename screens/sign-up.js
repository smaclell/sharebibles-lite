import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import styles from '../styles/signup';
import color from '../constants/colors';

export default class sharebiblesCreateAccount extends Component {
 static navigationOptions = {
   title: 'Sign In or Up',
   header: null,
 }

 static propTypes = {
   navigation: PropTypes.object.isRequired,
 }

 render() {
   const { navigate } = this.props.navigation;

   return (
     <View style={styles.container}>
       <ScrollView>
         <View style={styles.inner_container}>

           <Text style={{ color: color.mintCream, fontSize: 50, fontStyle: 'normal', marginBottom: 15 }}> Share Bibles </Text>

           <Image source={require('../assets/logo/logo.png')} style={styles.logo_container} />

           <Text style={{ color: color.mintCream, fontSize: 18, fontStyle: 'normal', marginBottom: 20 }}>
              Create Your Account </Text>

           <TextInput
             style={styles.textinput_container}
             placeholderTextColor="black"
             autoCapitalize="words"
             placeholder="Sam Smith"
           />

           <TextInput
             style={styles.textinput_container}
             placeholderTextColor="black"
             placeholder="you@email.com"
             keyboardType="email-address"
           />

           <TextInput
             style={styles.textinput_container}
             placeholderTextColor="black"
             placeholder="Password"
             secureTextEntry
           />

           <View style={styles.notice_container}>
             <Text style={{ color: 'black', fontSize: 17, marginTop: 20, textAlign: 'center' }}>
                You will need an access code from a Bible distribution group to continue.
                To find a group near you, click
             </Text>

             <TouchableOpacity>
               <Text style={{ color: 'red', fontSize: 17, marginBottom: 20, textAlign: 'center' }}>
                  here.
               </Text>
             </TouchableOpacity>


             <TextInput
               style={styles.textinput_container}
               placeholder="Access Code"
             />
           </View>

           <TouchableOpacity style={styles.button_container} onPress={() => navigate('Home')}>
             <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}> Create Account </Text>
           </TouchableOpacity>

           <Text style={{ color: color.mintCream, fontSize: 14, textAlign: 'center' }}>
              By clicking &quot;Create Account&quot; you agree to the Terms and Conditions
           </Text>

         </View>
       </ScrollView>
     </View>
   );
 }
}
