import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from './Home/home';
import Profile from './Profile';
import Icons from 'react-native-vector-icons/Entypo';
import Ant from 'react-native-vector-icons/AntDesign';
import Font from 'react-native-vector-icons/Fontisto';
import { Screen } from 'react-native-screens';
import { List } from 'react-native-paper';


const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {          //wrapping Home ,profile and holiday in bottom navigator
  return (
    <Tab.Navigator
      barStyle={{
       height:70,
      backgroundColor:'white',
       borderTopWidth:0.1,
       borderTopColor:'grey',
      }}
      activeColor="black"
      inactiveColor="grey"
      >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) =><Icons name="home" size={35} color={color} />  ,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
         
          tabBarIcon: ({color}) => <Ant name="profile" size={27} color={color} />,
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomNavigator;