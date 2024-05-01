import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const CheckInternet = ({ isConnected, setIsConnected }) => {
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connected type', state.type);
            console.log('Is connected ?', state.isConnected);
            setIsConnected(state.isConnected);
        });

        unsubscribe();
    });

    return (
        <View style={styles.layout}>
            <Text style={styles.text} >No Internet connection</Text>
            <Text>Check your internet connection</Text>
        </View>
    )
};
const styles = StyleSheet.create({
    layout: {
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',

    }
});

export default CheckInternet;