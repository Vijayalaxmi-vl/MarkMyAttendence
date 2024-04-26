import { format, addDays, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addWeeks, isSunday, isSameDay } from 'date-fns';

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

function Colorfullday(startDate, endDate) {
  let present_Days = ['2024-04-09'];
  let holi_Days = [];
  let spe_present_Days = [];
  let absent_Days = [];
  let sun_days = allSundays(startDate, endDate);
  let days = getDateArray(startDate, endDate);

  days.forEach(day => {
    if (
      !present_Days.includes(day) &&
      !holi_Days.includes(day) &&
      !spe_present_Days.includes(day)
    ) {
      absent_Days.push(day);
    }
  });

  let percentage_data = Math.round(Math.abs((present_Days.length + spe_present_Days.length) * 100 / (present_Days.length + spe_present_Days.length + absent_Days.length)));

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
      selectedColor: '#85241d',
      disableTouchEvent: true,
    
    };
  });

  return {
    objDate: dates,
    intPercentage: percentage_data
  };
}

 const  dateRange = (startDate, endDate) => {
  return Colorfullday(startDate, endDate);
};

export default dateRange;


 



