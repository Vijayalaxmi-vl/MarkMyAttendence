import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Pressable, StyleSheet } from 'react-native';
import { getTokenAndDateFromDatabase } from '../Database';
import { Attendance_api } from '../api';
import { format } from 'date-fns';

const TimeShow = ({ isVisible, selected_day }) => {         //  UI of selected day sign in and sign out time Box
  const [signin, setSignin] = useState();
  const [signout, setSignout] = useState();

  let signIn = [];
  let signOut = [];
  let start = selected_day;
  let end = selected_day;

  useEffect(()=>{
  getTokenAndDateFromDatabase().then(res => {
    Attendance_api(res.token, res.userId, start, end).then(result => {
      signIn = result.map(entry => entry.inTime);
      signOut = result.map(entry => entry.outTime);
      setSignin(signIn);
      setSignout(signOut);
      console.log(signIn,signOut);
    }).catch(error => {
      console.log("error in Sign in time ", error);
    });
  }).catch(error => {
    console.log('Error in getting token from database for sign in time:', error);
  });
},[selected_day]);


  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>

      <View style={styles.modalbox}>
        <Text style={styles.textheader}>{selected_day}</Text>
        <Text style={styles.texttitle}>Sign in : <Text style={styles.text}>{signin}</Text></Text>
        <Text style={styles.texttitle}>
          Sign out : <Text style={styles.text}> {signout}
          </Text></Text>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalbox: {
    width: "92%",
    height: 145,
    backgroundColor: 'white',
    marginVertical: 94,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
    shadowColor: 'blue',
    marginHorizontal: "4%"
  },
  textheader: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    bottom: 20,
  },
  texttitle: {
    fontSize: 15,
    color: 'black'
  },
  text: {
    fontSize: 15,
    color: 'green'
  }
});

export default TimeShow;