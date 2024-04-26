import React, { useState } from 'react';
import { StyleSheet, View, Text ,Pressable} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';


// UI for color discription of calendar
export default Colorinfo = () => {
    const [opencolorinfo, setOpencolorinfo] = useState(false);
    return (
        <View >
            <Pressable style={styles.updown}
                onPress={() => {
                    setOpencolorinfo(!opencolorinfo)
                }} >
                    {opencolorinfo ? 
                    <Icons name='up' size={25} color="black" />
                    :<Icons name='info' size={25} color="black" />
                }
               
            </Pressable>
            {opencolorinfo &&
                <View style={styles.colorinfo}>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={[styles.circle, { backgroundColor: '#13541c' }]}></View>
                        <Text style={styles.text}>Present</Text>
                        <View style={[styles.circle, { backgroundColor: '#85241d', marginLeft: 75 }]}></View>
                        <Text style={styles.text}>Absent</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={[styles.circle, { backgroundColor: '#78b37d' }]}></View>
                        <Text style={styles.text}>Attendence given by College</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={[styles.circle, { backgroundColor: '#c5c9c6' }]}></View>
                        <Text style={styles.text}>Holiday,Sunday</Text>
                    </View>
                </View>

            }
        </View>
    );
};

const styles = StyleSheet.create({
    updown: {
        height: 29,
        width: 30,
      //  backgroundColor: '#e3e2e1',
        marginLeft: "90%",
        borderRadius: 2,
        marginBottom: 5,
    },
    colorinfo: {
        height: 90, width: "100%",
        backgroundColor: 'white',
        borderRadius: 5,
    },
    circle: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: 'blue',
        marginHorizontal: 10,
        marginTop: 10,
    },
    text: {
        fontSize: 12,
        color: 'black',
        marginHorizontal: 5,
        marginTop: 10,
    }
});