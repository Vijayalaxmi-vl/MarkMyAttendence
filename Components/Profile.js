import React from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";


const Profile = () => {   //UI of Profile page

const Details='Details';



  return (
    <SafeAreaView >
      <ScrollView >
        <View style={{ width: "100%", height: 9, backgroundColor: '#e3e2e1', }}></View>
        <View style={styles.imgbox}>
          <View style={styles.img}>
            {/* <Image
        source={{ uri: 'https://example.com/image.jpg' }} // Replace 'https://example.com/image.jpg' with your image URL
        style={styles.image}
      /> */}
            <Icons name="user-circle-o" color={'grey'} size={100} />
          </View>
          <View style={styles.imgfoot}>
            <Text style={{fontSize: 18,
    color: 'black',
    fontWeight: '500',}} >{Details}</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              fontWeight: 'normal',
            }}> MIT Muzaffarpur</Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              fontWeight: 'normal',
            }}>MALE</Text>
          </View>

          <View style={styles.academic} >
            <Text style={styles.texthead} > <Icons name="institution" color={'black'} size={17} />  Academic</Text>
            <Text style={styles.text}> 22103107032</Text>
            <Text style={styles.text}> Information Technology</Text>
            <Text style={styles.text}> 2021 - 2025</Text>
            <Text style={styles.text}> admissiontype: Regular</Text>
            <Text style={styles.text}> yearback: 0</Text>
            <Text style={styles.text}> branchcode: 103</Text>
            <Text style={styles.text}> currentSemester: 3</Text>
          </View>
          <View style={styles.contact}>
            <Text style={styles.texthead}> <Icons name="phone" color={'black'} size={18} />  Contact Details</Text>
            <Text style={styles.text}>parentName: Arvind Kumar Singh</Text>
            <Text style={styles.text}>Parent Mobile no. : </Text>
            <Text style={styles.text}>Mobile no. : </Text>
            <Text style={styles.text}>Email :</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.texthead}> <Entypo name="address" color={'black'} size={20} />  Address</Text>
            <Text style={styles.text}>
              hosteller: true
              collegecode: 107E,
              image_url: "",
            </Text>
          </View>

          

          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  imgbox: {
    width: "100%",
  //  height: 690,
    backgroundColor: 'white',
    marginTop: 0,
    elevation: 5,
    shadowColor: 'black',

  },
  img: {
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover', // You can change the resizeMode as needed
  },
  imgfoot: {
    height: 60,
    //  backgroundColor: 'pink',
    marginTop: 5,
    borderRadius: 10,
    marginLeft: "2%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  texthead: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginBottom: 10,
    borderBottomWidth:0.5,
    
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'normal',
    marginLeft: "8%",
    marginTop: 3,
  },
  academic: {
    width: "90%",
    // height: 160,
    // backgroundColor: 'pink',
    marginTop: 50,
    borderRadius: 10,
    marginLeft: "3%"
  },
  contact: {
    width: "90%",
    //  height: 100,
    // backgroundColor: 'pink',
    marginTop: 50,
    borderRadius: 10,
    marginLeft: "3%",

  },
  address: {
    width: "90%",
    height: 100,
    // backgroundColor: 'pink',
    marginTop: 50,
    marginLeft: "3%"
  },

});

export default Profile;