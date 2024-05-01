import {
  format, addDays, addMonths, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, addWeeks, isSunday, isSameDay
} from 'date-fns';
import { getTokenAndDateFromDatabase } from '../Database';
import { Attendance_api } from '../api';


function allSundays(startDate, endDate) {
  let sundays = [];
  let currentDate = startDate;
  while (!isSunday(currentDate)) {
    currentDate = addDays(currentDate, 1);
  }

  while (currentDate <= endDate) {
    sundays.push(format(currentDate, 'yyyy-MM-dd'));
    currentDate = addDays(currentDate, 7);
  }

  return sundays;
}

function getDateArray(startDate, endDate) {
  let dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    if (isSunday(currentDate)) {
      currentDate = addDays(currentDate, 1);
    }
    else {
      dates.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate = addDays(currentDate, 1);
    }
  }

  return dates;
}

async function dateRange(startDate, endDate) {
  return new Promise((resolve, reject) => {
    try {
      let start = format(startDate, 'yyyy-MM-dd');
      let end = format(endDate, 'yyyy-MM-dd');
      let present_Days = [];
      let holi_Days = [];
      let spe_present_Days = [];
      let absent_Days = [];
      let sun_days = allSundays(startDate, endDate);
      let days = getDateArray(startDate, endDate);

      let signIn = [];
      let signOut = [];

      getTokenAndDateFromDatabase().then(res => {
        Attendance_api(res.token, res.userId, start, end).then(result => {
          present_Days = result.map(entry => entry.date);
          signIn = result.map(entry => entry.inTime );
          signOut = result.map(entry => entry.outTime );
          days.forEach(day => {
            if (
              !present_Days.includes(day) &&
              !holi_Days.includes(day) &&
              !spe_present_Days.includes(day)
            ) {
              absent_Days.push(day);
            }
          });

          let percentage_data = Math.round(
            Math.abs(
              (present_Days.length + spe_present_Days.length) * 100 / 
              (present_Days.length + spe_present_Days.length + absent_Days.length)
            )
          );

          let dates = {};
          present_Days.forEach(val => {
            dates[val] = {
              selected: true,
              selectedColor: '#13541c', 
              disableTouchEvent: false,
            };
          });

          holi_Days.forEach(val => {
            dates[val] = {
              selected: true,
              selectedColor: '#c5c9c6',
              disableTouchEvent: true,
            };
          });

          spe_present_Days.forEach(val => {
            dates[val] = {
              selected: true,
              marked: true,
              dotColor: 'green',
              selectedColor: '#78b37d',
              disableTouchEvent: true,
            };
          });

          sun_days.forEach(val => {
            dates[val] = {
              selected: true,
              selectedColor: '#c5c9c6', 
              disableTouchEvent: true,
            };
          });

          absent_Days.forEach(val => {
            dates[val] = {
              selected: true,
              selectedColor: '#85241d',    //#d47476 #85241d
              disableTouchEvent: true,
            };
          });

          resolve({
            objDate: dates,
            intPercentage: percentage_data,
            inTime: signIn,
            outTime:signOut,
            presentDays: present_Days
          });
        }).catch(error => {
          reject('Error while getting attendance data:', error);
        });
      }).catch(error => {
        reject('Error in getting token from database for attendance:', error);
      });
    } catch (error) {
      reject(error);
    }
  });
};


export default dateRange;




