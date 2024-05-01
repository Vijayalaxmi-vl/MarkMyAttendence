import axios from 'axios';

export const Login_api = async (userId,password) => {
  const data = {userId:parseInt(userId), password:password};
  const headers = {
    "Content-Type":"application/json",
  }
  const url = "https://api.markmyattendance.in/student/v1/login";
  const response = await axios.post(url,data, headers);
  const token = response.data.token;
  console.log(response.data.message);
  const details = await Get_Data_By_Token(token,userId);
  return {
    response:response.data,
    details:details
  };
};

export const Get_Data_By_Token = async (token,userId) => {
  const data = {userId:parseInt(userId)};
  const headers ={
    "Content-Type":"application/json",
    Authorization:token,
  };
  const url = "https://api.markmyattendance.in/student/v1/details";
  const details = await axios.post(url,data,{headers});
  console.log(details.data);
  return details.data;
};


export  const Attendance_api = async(token,userId,startDate,endDate)=>{
  const data = {userId:parseInt(userId),startDate:startDate, endDate:endDate };
  const headers = {
    "Content-Type": "application/json",
    Authorization:token,
  }
  const url = "https://api.markmyattendance.in/student/v1/attendance";
  const response = await axios.post(url, data, {headers});
  return response.data.attendance;
};




