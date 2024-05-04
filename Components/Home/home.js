import React, { useState, useEffect } from 'react';
import {
  StatusBar, Text, View, Pressable,
  TextInput, SafeAreaView, ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icons from 'react-native-vector-icons/AntDesign';
import styles from './Styles';
import TimeShow from './TimeShow';
import { startOfMonth, endOfMonth, format, startOfDay, addDays, isSunday } from 'date-fns';
import Calendar_Picker from './calendarPicker';
import Colorinfo from './colorinfo';
import { getTokenAndDateFromDatabase } from '../Database';
import { Attendance_api } from '../api';

// // Home page of App.
const Home = ({ navigation }) => {
  const [Attendance_status, setAttendance_status] = useState([]);
  const [att__statuscolor, setAtt__statuscolor] = useState(
    Attendance_status == 'Present' ? '#13541c' : '#85241d');
  const [input_start, setInput_Start] = useState('Start');
  const [input_end, setInput_End] = useState('End');
  const [attendancePercentage, setattendancePercentage] = useState('');
  const [showDateRange, setShowDateRange] = useState(false);               // set Visibility of DateRange starting and ending date
  const [colorDate, setcolorDate] = useState({});   // colorfuldays of calendar
  let mindate = startOfMonth(addDays(new Date(), -365)); // minimum date from where the calendar date starts showing
  mindate = format(mindate, 'yyyy-MM-dd');
  let maxdate = format(new Date(), 'yyyy-MM-dd');          // Maximum date of the calendar
  const [selected_day, setSetected_day] = useState(maxdate);                  // seleted day on calendar from present days
  const [display_Time, setDisplay_Time] = useState(false);           // set Visibility  of selected day sign in and sign out time
  let yesterday = format(addDays(new Date(), -1), 'yyyy-MM-dd');
  let dd = [];
  useEffect(() => {
    getTokenAndDateFromDatabase().then(res => {
      Attendance_api(res.token, res.userId, yesterday, maxdate).then(result => {
        dd = result.map(entry => entry.date);
        Today_status();
      }).catch(error => {
        console.log("error in today status ", error);
      });
    }).catch(error => {
      console.log('Error in getting token from database for today status:', error);
    });
  }, []);
  const Today_status = () => {
    let today = new Date();
    if (dd.length == 2) {
      setAttendance_status(['Present', 'Present']);
    } else if (today.getDay() === 0 || dd.length == 1) {
      setAttendance_status(['Present', "Sunday"]);
    } else if (today.getDay() === 1 || dd.length == 1) {
      setAttendance_status(["Sunday", 'Present']);
    } else {
      setAttendance_status(['Absent', 'Absent']);
    }
  };

  useEffect(() => {      ///hide  selected day sign in and sign out
    setTimeout(() => {
      setDisplay_Time(false);
    }, 4000);
  });

  const getdata = async (date_Range_Object) => {            //set % attendence and colorfulldays for DateRange submition
    setattendancePercentage(date_Range_Object.intPercentage);
    setcolorDate(date_Range_Object.objDate);
  };
  const closeModal = () => {   // Hide  DateRange starting and ending date
    setShowDateRange(false);
  };
  const update_Input_Start = (value) => {
    setInput_Start(value);
  };
  const update_Input_End = (value) => {
    setInput_End(value);
  };

  return (
    <SafeAreaView>
     <ScrollView 
     showsVerticalScrollIndicator={false} 
     >
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <View style={{ width: "100%", height: 9, backgroundColor: '#e3e2e1' }}></View>

        <Calendar_Picker showDateRange={showDateRange} closeModal={closeModal} getdata={getdata}
          update_Input_Start={update_Input_Start}
          update_Input_End={update_Input_End}
        />
        <TimeShow isVisible={display_Time} selected_day={selected_day} />

        <View style={styles.box}>
          <Pressable style={styles.pressinput}
            onPress={() => setShowDateRange(true)} >
            <TextInput
              style={styles.input}
              value={`${input_start}         ➔          ${input_end}`} // Combine start and end variables
              onChangeText={() => {
                update_Input_Start(input_start);
                update_Input_End(input_end);
              }}
              placeholder="Start and end"
              placeholderTextColor="black"
              editable={false}
            />
            <Icons name='calendar' size={20} color="black" />
          </Pressable>
          <Text style={{
            fontSize: 25, color: 'black', marginTop: 10,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5,
          }}>
            {attendancePercentage}%
          </Text>
        </View>


        <View style={styles.statusbox}>
          <View style={styles.status}>
            <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false}
              contentOffset={{ x: 400, y: 0 }} // Set contentOffset to start from the left side
            >
              <View style={{
                width: 400, justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 18, color: 'black', margin: 8,
                }}>
                  Yesterday status :
                  <Text style={{
                    fontSize: 20, color: att__statuscolor, fontWeight: 'normal', textShadowColor: 'rgba(0, 0, 0, 0.4)',
                    textShadowOffset: { width: 1, height: 1.5 },
                    textShadowRadius: 3,
                  }}>
                    {' '}
                    {Attendance_status[0]}
                  </Text>{' '}
                </Text>
              </View>
              <View style={{
                width: 400, justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 18, color: 'black', margin: 8,
                }}>
                  Today status :
                  <Text style={{
                    fontSize: 20, color: att__statuscolor, fontWeight: 'normal', textShadowColor: 'rgba(0, 0, 0, 0.4)',
                    textShadowOffset: { width: 1, height: 1.5 },
                    textShadowRadius: 3,
                  }}>
                    {' '}
                    {Attendance_status[1]}
                  </Text>{' '}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>


        <View style={styles.calendar} >
          <Text style={{
            fontSize: 15, color: 'black', marginTop: 10,
            textAlign: 'center', backgroundColor: 'white', paddingTop: 2, textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }} >Attendance Calendar</Text>
          <Calendar
            style={{ width: '100%', borderRadius: 5, }}
            theme={{
              'stylesheet.calendar.header': {
                dayHeader: {
                  color: 'grey',
                },
                monthHeader: {
                  fontSize: 20,
                  color: 'grey',
                },
              },
              textDayFontSize: 14,
              backgroundColor: 'white',
              calendarBackground: 'white',
              arrowColor: 'black',

            }}

            disableAllTouchEventsForDisabledDays={true}
            disabledByDefault={true}

            maxDate={maxdate}
            minDate={mindate}
            allowSelectionOutOfRange={false}
            hideExtraDays={true}
            onDayPress={(day) => {
              setDisplay_Time(!display_Time);
              setSetected_day(day.dateString);
            }}
            markedDates={colorDate}

          />
          <Colorinfo />
        </View>



        </ScrollView>
    </SafeAreaView>
  );
};

export default Home;


