import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Text, View, StyleSheet, Pressable } from 'react-native';


{/* <Tab.Screen
        name="Holiday"
        component={Holiday}
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <Font name="holiday-village" size={25} color={color} />
          ),
        }}
      /> */}


const Holiday = () => {
  const [toggledMonth, setToggledMonth] = useState(null);

  const toggle = (month) => {
    setToggledMonth(month === toggledMonth ? null : month);
  };

  const monthsWithHolidays = [
    { name: "January", holidays: ["New Year's Day", "Martin Luther King Jr. Day"] },
    { name: "February", holidays: ["Valentine's Day", "Presidents' Day"] },
    { name: "March", holidays: ["St. Patrick's Day"] },
    { name: "April", holidays: ["April Fools' Day", "Easter"] },
    { name: "May", holidays: ["Mother's Day", "Memorial Day"] },
    { name: "June", holidays: ["Father's Day"] },
    { name: "July", holidays: ["Independence Day"] },
    { name: "August", holidays: ["Labor Day"] },
    { name: "September", holidays: ["Labor Day"] },
    { name: "October", holidays: ["Columbus Day", "Halloween"] },
    { name: "November", holidays: ["Veterans Day", "Thanksgiving"] },
    { name: "December", holidays: ["Christmas Day", "New Year's Eve"] }
  ];

  return (
    <SafeAreaView >
      <ScrollView>
        <View style={{ width: "100%", height: 9, backgroundColor: '#e3e2e1' }}></View>
        {monthsWithHolidays.map(({ name, holidays }, index) => (
          <Pressable key={index} onPress={() => toggle(name)}>
            <View style={toggledMonth === name ? styles.bigbox : styles.box}>
              <View style={styles.pipe}></View>
              <Text style={styles.month}>{name}</Text>
              {toggledMonth === name && (
                <View style={styles.holidayContainer}>
                  {holidays.map((holiday, index) => (
                    <Text key={index} style={styles.holiday}>{holiday}</Text>
                  ))}
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "96%",
    height: 70,
    backgroundColor: 'white',
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    marginHorizontal: "2%"
  },
  month: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
    color: '#69522e',
  },
  pipe: {
    width: 3,
    height: 40,
    backgroundColor: 'blue',
    margin: 15,
  },
  bigbox: {
    width: "96%",
    height: 180,
    backgroundColor: 'white',
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'green',
    marginHorizontal: "2%"
  },
  holidayContainer: {
    marginLeft: 50,
    marginTop: 20,
  },
  holiday: {
    fontSize: 16,
    color: '#69522e',
  }
});

export default Holiday;



