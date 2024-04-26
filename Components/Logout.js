import React, { useState } from 'react'; 
import { View, StyleSheet, Alert, Pressable, TouchableOpacity ,Text} from 'react-native'; 
import EntIcon from 'react-native-vector-icons/Entypo';
import { deleteUser } from './Database';
import { useNavigation } from '@react-navigation/native';


 const Dropdown = () => {                      //UI of logout  
  const [onClick, setOnClick] = useState(false); 
  const navigation = useNavigation();

  return ( 
    
      <View style={styles.container}> 
       <TouchableOpacity style={styles.dots}
       onPress={()=>{
      setOnClick(!onClick);
       }}
       >
        <EntIcon  name="dots-three-vertical" size={20} color={'black'}  />
       </TouchableOpacity>
         {onClick ? (
            <TouchableOpacity  style={styles.box}
       onPress={()=>{  
          deleteUser({navigation});
       }}>
            <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
         ) : null }
      </View> 
   
  ); 
}; 

const styles = StyleSheet.create({ 
  container:{
       flexDirection:'column',
       height:75,
       width:85,
       marginTop:45,
       
  },
  box: { 
    width: 79, 
    justifyContent: 'center', 
    height: 45, 
    backgroundColor:'white',
    marginTop:10,
    elevation:5,
    shadowColor:'black',
    borderRadius:3,
    borderBlockColor:'#7a38b0',
    borderWidth:0.5,
    borderBottomWidth:4,
   
  }, 
  dots :{
    height:35,
    width:40,
    marginLeft:43,
    paddingTop:12,
    
   
  },
  text:{
    fontSize:17,
    fontWeight:'bold',
    color:'#7a38b0',//#85241d
    paddingLeft:9,
    backgroundColor:'white',
  }
});

export default Dropdown; 

