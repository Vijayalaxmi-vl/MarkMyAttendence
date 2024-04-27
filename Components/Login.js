import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  StatusBar,
  Modal,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { CheckUser, RegisterUser } from './Database';
import { useIsFocused } from '@react-navigation/native';

const Login = ({ navigation }) => {                   //Login Page UI
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('123456');
  const [userId, setUserId] = useState('22103107032');

 // const isFocused = useIsFocused();

  useEffect(() => {            // on opening app checking user login data exit or not in database
    CheckUser({ navigation });
  }, []);

  const clearFields = () => {   // clear all input feild value after 2 seconds press 'sign in'  button
    setTimeout(() => {
      setUsername('');
      setUserId('');
      setPassword('');
    }, 2000);
  };

  
  return (
    <SafeAreaView    >
      <ScrollView>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

        <View style={styles.container} >

          <View style={styles.logo}>
            <Text><Entypo name="thumbs-up" color={'#7a38b0'} size={34} />
              <Text style={styles.logotext}>  Mark My Attendance</Text>
            </Text>
          </View>

          <View style={styles.box}>
            <View >
              <Icons name="user-circle-o" color={'grey'} size={70} />
            </View>
            <Text style={{ fontSize: 14, marginTop: 15, color: 'grey', marginBottom: 15, }}>Please Sign in to continue</Text>

            <TextInput
              style={styles.input}
              value={username}
              onChangeText={text => setUsername(text)}
              placeholder="Username"></TextInput>
            <TextInput
              style={styles.input}
              value={userId}
              onChangeText={text => setUserId(text)}
              placeholder="Registration no.."></TextInput>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password">

            </TextInput>


            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                RegisterUser({ navigation, username, userId, password });   // saving user login data in database
               // clearFields();
              }}>
              <Text style={{ fontSize: 25, color: '#f2f1f0', textAlign: 'center', padding: 5, fontWeight: '500' }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },


  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '96%',
    height: 440,
    backgroundColor: '#e3e2e1',
    borderRadius: 15,
    marginHorizontal: '2%',
    marginTop: 30,
    elevation: 10,
    shadowColor: 'black',
  },
  logo: {
    marginTop: 80,
  },
  logotext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7a38b0',

  },
  input: {
    width: "90%",
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    backgroundColor: '#e3e2e1',
    paddingLeft: 13,
    fontSize: 16,
  },
  btn: {
    width: "90%",
    height: 45,
    borderRadius: 8,
    backgroundColor: '#7a38b0',
    margin: 15,

  },
});

export default Login;