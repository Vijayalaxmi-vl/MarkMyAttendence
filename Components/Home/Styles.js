import {StyleSheet} from 'react-native';



const styles = StyleSheet.create({
    box: {
      width:"92%",
      height: 145,
      backgroundColor:'white',
      marginVertical: 35,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 10,
      marginHorizontal:"4%",
      elevation:3,
      shadowColor: 'black',
    },
    input: {
      width: 250,
      height: 35,
      color:'black',
      fontSize: 14,
      marginTop: 5,
      backgroundColor: 'white',
      //textAlign: 'center',
    },
    pressinput: {
      flexDirection: 'row',
       alignItems: 'center', 
      borderRadius: 12,
      borderWidth:0.4,
      borderColor:'#e3e2e1',
      paddingHorizontal:15,
      borderBottomWidth:4,
     // borderBottomColor:'blue',
      marginBottom:10

    },

    statusbox: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    status: {
      height: 50,
      width: '92%',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      elevation: 5,
      shadowColor: 'black',
      backgroundColor: '#e3e2e1',
    },
    statusbtn:{
    left:"100%",
    } ,
   
  
    calendar: {
      width: '92%',
      borderRadius: 5,
      marginHorizontal:"4%",
      elevation: 3,
      shadowColor: 'black',
      backgroundColor: 'white',
      marginTop:35,
      marginBottom: 20,
      borderWidth:2,
      borderColor:'#e3e2e1',
    },
  
    modalbox:{
      width:"92%",
      height: 145,
      backgroundColor:'white',
      marginVertical: 94,
    // justifyContent:'center',
     // alignItems:'center',
      borderRadius: 5,
      elevation:3,
      shadowColor: 'blue',
      marginHorizontal:"4%",
    },

    textstyle:{
     fontSize:15,
     color:'black',
     fontWeight:'500',
     marginTop:14,
     marginLeft:25,
    },

    upperbox: {
     marginTop:5,
     flexDirection: 'row',
     justifyContent:'center',
      alignItems:'center',
    },
    btntext:{
      color: 'silver',
      fontSize: 14,
      textAlign: 'center',
     // paddingHorizontal:15,
    },
    btn: {
      width:"30%",
      height: 45,
      borderRadius:3,
     // backgroundColor: '#9f62d1',
      justifyContent:'center',
      alignItems:'center',
      elevation:2,
      shadowColor: 'black',
      marginVertical:5,
    //  borderBlockColor:'#9f62d1',
     // borderWidth:0.5,
    },
   
 
  });
  

  export default styles;