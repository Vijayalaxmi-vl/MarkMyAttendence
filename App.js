import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Login from './Components/Login';
import {NavigationContainer,useNavigation,DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Parent from './Components/Parent';
import Ento from 'react-native-vector-icons/Entypo';
import { Pressable, View } from 'react-native';
import Dropdown from './Components/Logout';
import LoadingIndicator from './Components/Loading';
import BackButtonHandle from './Components/Backhandle';
//import Custom_Drawer from './Components/Home/Customdrawer';
//import Drawer_Page from './Components/Drawer/DrawerNavigator';

const Stack = createStackNavigator();

const App = () => {


  return (
    <>
    <NavigationContainer>
        <Stack.Navigator 
         screenOptions={{
          headerStyle:{
          height:50,
          }
         }}
         >
          <Stack.Screen                  //login Page 
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen                      //Loading indicator page
          name="LoadingIndicator"
          component={LoadingIndicator}
          options={{
          headerLeft: () => (<View style={{marginLeft:20,marginTop:10,}}><Ento name="thumbs-up" color={'#7a38b0'} size={25} /></View>), 
          title:'Mark My Attendance',
          headerTitleStyle: {
            color:'#7a38b0',
            fontSize:21,
            fontWeight:'bold',
            marginTop:10,
          },
          headerStyle:{height:70}
        }}
        />
        
        <Stack.Screen                        // Home page
          name="Mark My Attendance"
          component={Parent}
          options={{
            headerLeft: () => (<View style={{marginLeft:20,marginTop:10,}}><Ento name="thumbs-up" color={'#7a38b0'} size={25} /></View>), 
            headerTitleStyle: {
              color:'#7a38b0',
              fontSize:21,
              fontWeight:'bold',
              marginTop:10,
            },
            
            headerRight: () => (<Dropdown />), 
          }}
         
        />
      
      </Stack.Navigator>
    </NavigationContainer>
      <BackButtonHandle/>
    </>
  );
};

export default App;
