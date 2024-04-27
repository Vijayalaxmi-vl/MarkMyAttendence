import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import Icons from 'react-native-vector-icons/AntDesign';
import styles from './Styles';
import TimeShow from './TimeShow';
import { startOfMonth, endOfMonth, format, startOfDay, addDays, isSunday } from 'date-fns';
import Calendar_Picker from './calendarPicker';
import lastMonth, { lastWeek, dateRange, currentMonth } from './colorfulldays';
import Colorinfo from './colorinfo';


// // Home page of App.
const Home = ({ navigation }) => {
  const [Attendance_status, setAttendance_status] = useState('Absent');
  const [att__statuscolor, setAtt__statuscolor] = useState(
    Attendance_status == 'Present' ? '#13541c' : '#85241d');

  const [input_start, setInput_Start] = useState('Start');
  const [input_end, setInput_End] = useState('End');
  const [attendancePercentage, setattendancePercentage] = useState('');
  const [showDateRange, setShowDateRange] = useState(false);               // set Visibility of DateRange starting and ending date
  const [selected_day, setSetected_day] = useState('');                  // seleted day on calendar from present days
  const [display_Time, setDisplay_Time] = useState(false);           // set Visibility  of selected day sign in and sign out time

  const [colorDate, setcolorDate] = useState({});   // colorfuldays of calendar

  let mindate = startOfMonth(addDays(new Date(), -365)); // minimum date from where the calendar date starts showing
  let maxdate = new Date(); // Maximum date of the calendar
  mindate = format(mindate, 'yyyy-MM-dd');
  maxdate = format(maxdate, 'yyyy-MM-dd');


  let status_day = new Date();
  const Today_status = () => {
    if (status_day.getDay() === 0) {
      setAttendance_status("Sunday");
    } else {
      setAttendance_status("Absent");
    }
  };

  const Yesterday_status = () => {
    
      if (status_day.getDay() === 0) {
        setAttendance_status("Sunday");
      } else {
        setAttendance_status("Absent");
      }
    
  };

  useEffect(() => {      ///hide  selected day sign in and sign out
    setTimeout(() => {
      setDisplay_Time(false);
    }, 2000);
  });

  const getdata = (date_Range_Object) => {            //set % attendence and colorfulldays for DateRange submition
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
      <ScrollView>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <View style={{ width: "100%", height: 9, backgroundColor: '#e3e2e1' }}></View>

        <Calendar_Picker showDateRange={showDateRange} closeModal={closeModal} getdata={getdata}
          update_Input_Start={update_Input_Start}
          update_Input_End={update_Input_End}
        />
        <TimeShow isVisible={display_Time} selected_day={selected_day} />

        <View style={styles.box}>
            <Pressable  style={styles.pressinput}
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
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', marginTop: 10, }}>
              {attendancePercentage}%
            </Text>
        </View>


        <View style={styles.statusbox}>
          <View style={styles.status}>
            <ScrollView horizontal={true}
            contentOffset={{ x: 400, y: 0 }} // Set contentOffset to start from the left side
            >
              <View style={{
                width: 400, justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: 18, color: 'black', margin: 8 }}>
                  Yesterday status :
                  <Text style={{ fontSize: 20, color: att__statuscolor, fontWeight: 'normal' }}>
                    {' '}
                    {Attendance_status}
                  </Text>{' '}
                </Text>
              </View>
              <View style={{
                width: 400, justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: 18, color: 'black', margin: 8 }}>
                  Today status :
                  <Text style={{ fontSize: 20, color: att__statuscolor, fontWeight: 'normal' }}>
                    {' '}
                    {Attendance_status}
                  </Text>{' '}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
       

        <View style={styles.calendar} >
          <Text style={{ fontSize: 15, fontWeight: "500", color: 'black', marginTop: 10,
           textAlign: 'center', backgroundColor: 'white', paddingTop: 2, }} >Attendance Calendar</Text>
          <Calendar
            style={{width: '100%',borderRadius: 5,}}
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


