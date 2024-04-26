import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Entypo from 'react-native-vector-icons/Entypo';
import { startOfMonth, endOfMonth, format, startOfDay, addDays, isSunday, addMonths } from 'date-fns';
import dateRange from './colorfulldays';
import styles from './Styles';


const Calendar_Picker = ({ showDateRange, closeModal, getdata, update_Input_Start, update_Input_End }) => {
    const [start, setStart] = useState('DD-MM-YYYY');    //Starting date of dateRange Function for % attendence
    const [end, setEnd] = useState('DD-MM-YYYY');
    const [buttonColor1, setButtonColor1] = useState(['#7a38b0', 'white']);                 //Color of button which calculate % attendence
    const [buttonColor2, setButtonColor2] = useState(['white', 'black']);
    const [buttonColor3, setButtonColor3] = useState(['white', 'black']);
    const [buttonColor4, setButtonColor4] = useState(['white', 'black']);
    const [buttonColor5, setButtonColor5] = useState(['white', 'black']);
    const [buttonColor6, setButtonColor6] = useState(['white', 'black']);


    useEffect(() => {           // set colorfulldays of calendar on opening app  
        getdata(currentMonth());
    }, []);

    const onSubmit = () => {
        if (start != 'DD-MM-YYYY' && end != 'DD-MM-YYYY') {
            let date_Range_Object = dateRange(start, end);
            getdata(date_Range_Object);
        }
        closeModal();
    };

    const minDate = new Date(2023, 6, 3);
    const maxDate = new Date();

    const onDateChange = (date, type) => {

        console.log(JSON.stringify(date));
        const newDate = JSON.stringify(date);
        const newDate1 = newDate.substring(1, newDate.length - 1);
        const dates = newDate1.split("T");
        const date1 = dates[0].split("-");
        const day = date1[2];
        const month = date1[1];
        const year = date1[0];
        console.log(day + "-" + month + "-" + year);

        if (type == 'END_DATE') {
            if (day == undefined) {
                updateEnd('DD-MM-YYYY');
            }
            else {
                updateEnd(date);
                onSubmit();
            }
        }
        else {
            updateStart(date);
            updateEnd('DD-MM-YYYY');
        }

        setButtonColor1(['white', 'black']);
        setButtonColor2(['white', 'black']);
        setButtonColor3(['white', 'black']);
        setButtonColor4(['white', 'black']);
        setButtonColor5(['white', 'black']);
        setButtonColor6(['white', 'black']);

    };
    const updateStart = (value) => {     // get starting date from DatetimePicker
        setStart(value);
        const newDate = JSON.stringify(value);
        const newDate1 = newDate.substring(1, newDate.length - 1);
        const dates = newDate1.split("T");
        const date1 = dates[0].split("-");
        const day = date1[2];
        const month = date1[1];
        const year = date1[0];
        update_Input_Start(day + "-" + month + "-" + year);
    };
    const updateEnd = (value) => {         // get ending date from DatetimePicker
        setEnd(value);
        const newDate = JSON.stringify(value);
        const newDate1 = newDate.substring(1, newDate.length - 1);
        const dates = newDate1.split("T");
        const date1 = dates[0].split("-");
        const day = date1[2];
        const month = date1[1];
        const year = date1[0];
        if (value == 'DD-MM-YYYY')
            update_Input_End('DD-MM-YYYY');
        else
            update_Input_End(day + "-" + month + "-" + year);
    };

    function from_30_Day_ago() {
        const today = new Date();
        const startDate = addDays(today, -30); // Subtracting a day to get the last day of the previous month
        const endDate = today;
        updateStart(startDate);
        updateEnd(endDate);
        return dateRange(startDate, endDate);
    };
    function last_6_Months() {
        const today = new Date();
        const startDate = addDays(addMonths(today, -6), 1); // Subtracting a day to get the last day of the previous month
        const endDate = today;
        updateStart(startDate);
        updateEnd(endDate);
        return dateRange(startDate, end);
    };
    function thisYear() {
        const today = new Date();
        const startDate = addDays(today, -365); // Subtracting a day to get the last day of the previous month
        const endDate = today;
        updateStart(startDate);
        updateEnd(endDate);
        return dateRange(startDate, endDate);
    };
    function lastWeek() {
        const today = new Date();
        const endDate = today;
        const startDate = addDays(today, -6);
        updateStart(startDate);
        updateEnd(endDate);
        return dateRange(startDate, endDate);
    }
    function lastMonth() {
        const today = new Date();
        const startDate = startOfMonth(addMonths(today, -1)); // Subtracting a day to get the last day of the previous month
        const endDate = endOfMonth(addMonths(today, -1));;
        const start1 = addDays(startOfMonth(startDate), 1);
        updateStart(start1);
        updateEnd(endDate);
        return dateRange(startDate, endDate);
    }

    function currentMonth() {
        const today = new Date();
        const startDate = addDays(startOfMonth(today), 0);
        const endDate = today;
        const start1 = addDays(startOfMonth(startDate), 1);
        updateStart(start1);
        updateEnd(endDate);
        return dateRange(startDate, endDate);
    }


    return (
        <View >

            <Modal visible={showDateRange} animationType="fade" transparent={true}>
                <View style={stylesthis.Layout} >
                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        width={350}
                        headerWrapperStyle={{ marginTop: 20, }}
                        todayBackgroundColor="#e6ffe6"
                        selectedDayColor="#7300e6"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}

                    />

                    <View style={styles.upperbox}>
                        <Pressable
                            style={[styles.btn, { backgroundColor: buttonColor1[0] }]}
                            onPress={() => {
                                getdata(currentMonth());
                                closeModal();
                                setButtonColor1(['#7a38b0', 'white']);
                                setButtonColor2(['white', 'black']);
                                setButtonColor3(['white', 'black']);
                                setButtonColor4(['white', 'black']);
                                setButtonColor5(['white', 'black']);
                                setButtonColor6(['white', 'black']);
                            }}>
                            <Text style={[styles.btntext, { color: buttonColor1[1] }]}>Current Month</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, { backgroundColor: buttonColor2[0], marginHorizontal: "3%", }]}
                            onPress={() => {
                                getdata(lastMonth());
                                closeModal();
                                setButtonColor1(['white', 'black']);
                                setButtonColor2(['#7a38b0', 'white']);
                                setButtonColor3(['white', 'black']);
                                setButtonColor4(['white', 'black']);
                                setButtonColor5(['white', 'black']);
                                setButtonColor6(['white', 'black']);
                            }}>
                            <Text style={[styles.btntext, { color: buttonColor2[1] }]}>Last Month
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, { backgroundColor: buttonColor3[0] }]}
                            onPress={() => {
                                getdata(lastWeek());
                                closeModal();
                                setButtonColor1(['white', 'black']);
                                setButtonColor2(['white', 'black']);
                                setButtonColor3(['#7a38b0', 'white']);
                                setButtonColor4(['white', 'black']);
                                setButtonColor5(['white', 'black']);
                                setButtonColor6(['white', 'black']);
                            }}>
                            <Text style={[styles.btntext, { color: buttonColor3[1] }]}>Last 7 days</Text>
                        </Pressable>
                    </View>
                    <View style={styles.upperbox}>
                        <Pressable
                            style={[styles.btn, { backgroundColor: buttonColor4[0] }]}
                            onPress={() => {
                                getdata(from_30_Day_ago());
                                closeModal();
                                setButtonColor1(['white', 'black']);
                                setButtonColor2(['white', 'black']);
                                setButtonColor3(['white', 'black']);
                                setButtonColor4(['#7a38b0', 'white']);
                                setButtonColor5(['white', 'black']);
                                setButtonColor6(['white', 'black']);
                            }}>
                            <Text style={[styles.btntext, { color: buttonColor4[1] }]}>Last 30 days</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, { backgroundColor: buttonColor5[0], marginHorizontal: "3%", }]}
                            onPress={() => {
                                getdata(thisYear());
                                closeModal();
                                setButtonColor1(['white', 'black']);
                                setButtonColor2(['white', 'black']);
                                setButtonColor3(['white', 'black']);
                                setButtonColor4(['white', 'black']);
                                setButtonColor5(['#7a38b0', 'white']);
                                setButtonColor6(['white', 'black']);
                            }}>
                            <Text style={[styles.btntext, { color: buttonColor5[1] }]}> One Year
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, { backgroundColor: buttonColor6[0] }]}
                            onPress={() => {
                                getdata(last_6_Months());
                                closeModal();
                                setButtonColor1(['white', 'black']);
                                setButtonColor2(['white', 'black']);
                                setButtonColor3(['white', 'black']);
                                setButtonColor4(['white', 'black']);
                                setButtonColor5(['white', 'black']);
                                setButtonColor6(['#7a38b0', 'white']);
                            }}>
                            <Text style={[styles.btntext, { color: buttonColor6[1] }]}>Six Months</Text>
                        </Pressable>
                    </View>

                    {/* <Pressable onPress={onSubmit}>
                        <Text style={stylesthis.cross}>
                            <Entypo name="cross" color={'black'} size={30} />
                        </Text>
                    </Pressable> */}

                </View>
            </Modal>
        </View>
    )
};



const stylesthis = StyleSheet.create({
    Layout: {
        width: "92%",
        height: 410,
        backgroundColor: '#e3ddcc',
        marginTop: 280,
        marginHorizontal: "4%",
        borderRadius: 10,
        elevation:3,
        shadowColor: 'blue',
    },
    cross: {
        marginLeft: "90%",
        marginTop: 10,
    },
});

export default Calendar_Picker;
