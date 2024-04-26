import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import styles from './Styles';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo from 'react-native-vector-icons/Entypo';


//Custom daterange box UI
const CustomDateRange = ({ showDateRange, closeModal, getdata, start, end, updateStart, updateEnd }) => {

  const [inputtext, setinputtext] = useState(new Date());
  const [showpicker, setshowpicker] = useState(false);
  const [showpicker2, setshowpicker2] = useState(false);
  const [formReady, setformReady] = useState(false);

  const onSubmit = () => {
    getdata();
    closeModal();
    // setTimeout(() => {        //closing Custom date Range box after 1 second
    //   closeModal();
    // }, 1000);
    setTimeout(() => {
      updateStart('');
      updateEnd('');
    }, 2000);  
  };

  useEffect(() => {                   
    setformReady(start && end);
  }, [start, end]);

  const toggleDatePicker = () => {       //toggle starting datePicker dialog box
    setshowpicker(!showpicker);
  };
  const toggleDatePicker2 = () => {       //toggle ending datePicker dialog box
    setshowpicker2(!showpicker2);
  };
  const onChangeStart_Date = (event, selectedDate) => {           // Starting date setting  function
    if (event.type == 'set') {
      setinputtext(selectedDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
        updateStart(moment(selectedDate).format('YYYY-MM-DD'));
       
      }
    }
    else {
      toggleDatePicker();
    }
  };
  const onChangeEnd_Date = (event, selectedDate) => {           // Ending date setting  function
    if (event.type == 'set') {
      setinputtext(selectedDate);
      if (Platform.OS === 'android') {
        toggleDatePicker2();
        updateEnd(moment(selectedDate).format('YYYY-MM-DD'));
        
      }
    }
    else {
      toggleDatePicker2();
    }
  };

  return (
    <Modal visible={showDateRange} animationType="fade" transparent={true}>

      <View style={styles.modalbox}>
        <View style={{ flexDirection: 'row' }}>
          {showpicker && (
            <DateTimePicker                       //  starting DatePicker dialog box 
              mode="date"
              display="spinner"
              value={inputtext}
              onChange={onChangeStart_Date}
              maximumDate={new Date()}
              minimumDate={new Date('2023-06-01')}
            />
          )}
          <Text style={styles.textstyle}>Enter Starting Date : </Text>
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              style={[styles.input, { marginTop: 10, }]}
              value={start}
              onChangeText={updateStart}
              placeholder="StartDate"
              placeholderTextColor="black"
              editable={false}
            />
          </Pressable>
          <Pressable onPress={closeModal}>
            <Text style={styles.cross}>
              <Entypo name="cross" color={'black'} size={30} />
            </Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {showpicker2 && (
            <DateTimePicker                                 //  Ending DatePicker dialog box 
              mode="date"
              display="spinner"
              value={inputtext}
              onChange={onChangeEnd_Date}
              maximumDate={new Date()}
              minimumDate={new Date('2023-06-01')}
            />
          )}
          <Text style={styles.textstyle}>Enter Ending Date : </Text>

          <Pressable
            onPress={toggleDatePicker2}>
            <TextInput
              style={[styles.input, { marginRight: 0 }]}
              value={end}
              onChangeText={updateEnd}
              placeholder="EndDate"
              placeholderTextColor="black"
              editable={false}
            />
          </Pressable>
        </View>
        <TouchableOpacity disabled={!formReady} onPress={onSubmit}>
          <Text
            style={[
              styles.input,
              {
                backgroundColor: formReady ? '#7a38b0' : '#e8e8e3',
                color: formReady ? 'white' : 'black',
                paddingTop: 4,
                fontSize: 20,
                marginLeft: "30%",
              },
            ]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

<Pressable
style={[styles.pressicon, { backgroundColor: buttonColor4[0] }]}
onPress={() => {
  setShowDateRange(true);
  setButtonColor1(['#7a38b0','white']);
  setButtonColor2(['#7a38b0','white']);
  setButtonColor3(['#7a38b0','white']);
  setButtonColor4(['white','black']);
}}>
<Text >
  <Icons name="calendar" size={35} color={buttonColor4[1]} />
</Text>
</Pressable>


export default CustomDateRange;