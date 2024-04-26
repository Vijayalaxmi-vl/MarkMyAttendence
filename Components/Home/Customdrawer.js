import {
    SafeAreaView, ScrollView, StyleSheet, Text, View,
    Pressable,
} from "react-native";
import Ento from 'react-native-vector-icons/Entypo';
import React, { useState } from "react";
import {useNavigation} from '@react-navigation/native';


const Custom_Drawer = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigation=useNavigation(); 
    return (

       
          
                <View style={styles.Container}>
                    <Pressable style={styles.menu}
                        onPress={() => { setOpenDrawer(!openDrawer); }}
                    >
                        <Ento name="menu" color={'black'} size={25} />
                    </Pressable>

                    {openDrawer ?
                        <Pressable style={styles.drawer}
                        onPress={() => { setOpenDrawer(!openDrawer); }}
                        >


                            <Text>Custom</Text>
                        </Pressable>
                        : null
                    }
                </View>
           
        
    );
};



const styles = StyleSheet.create({
    Container: {
        flexDirection:'column',
        width:39,
        height:40,
      //  backgroundColor: 'pink',
        marginLeft:0,
        marginTop:0,

    },
    menu:{
        width:30,
        height:52,
       // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:5,
        marginTop:0,


    },

    drawer:{
        width:250,
        height:640,
        backgroundColor:'white',
        Top:0,

    }

});

export default Custom_Drawer; 