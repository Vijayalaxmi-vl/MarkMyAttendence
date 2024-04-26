import React from 'react';
import { Text, View } from 'react-native'; 
import { createDrawerNavigator }  
         from '@react-navigation/drawer'; 
import NotificationsScreen from './Notification';
import AboutScreen from './About';
// import Parent from '../Parent';
 
         
const Drawer = createDrawerNavigator();         

const  Drawer_Page=()=> { 
 
  return ( 
   
      <Drawer.Navigator > 
        <Drawer.Screen name="Mark Attendence1" component={Parent} /> 
        <Drawer.Screen name="Notifications" 
                       component={NotificationsScreen} /> 
        <Drawer.Screen name="About" component={AboutScreen} /> 
        </Drawer.Navigator> 
   
  ); 
}

export default  Drawer_Page;