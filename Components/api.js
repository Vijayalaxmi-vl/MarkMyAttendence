import axios from 'axios';

let Details_Data ;
let Token_Api ;

const Login_api = async () => {
  console.warn(userId);
  const data = { userId: parseInt(userId), password: password };
  const headers = {
    "Content-Type": "application/json",
  }
  const url = "https://api.markmyattendance.in/student/v1/login";
  const response = await axios.post(url, data, headers);
  const token = response.data.token;
  console.log(response.data);
  Token_Api= token;
  await Get_Data_By_Token(token);
};
const Get_Data_By_Token = async (token) => {
  console.warn(password);
  const data = { userId: parseInt(userId) };
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const url = "https://api.markmyattendance.in/student/v1/details";
  const details = await axios.post(url, data, { headers });
  console.log(details.data);

  Details_Data =  details.data ;
};


