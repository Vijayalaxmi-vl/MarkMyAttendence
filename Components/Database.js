import { openDatabase } from 'react-native-sqlite-storage';
import { Get_Data_By_Token, Login_api } from './api';


var db = openDatabase({ name: 'UserDatabase.db' });


const userData = {
  "admissionType": "R",
  "admissionYear": "2022",
  "batch": "2022",
  "bioId": "22103107032",
  "branchCode": "103",
  "collegeCode": "107E",
  "currentSemester": "3",
  "emailId": "zreeta000@gmail.com",
  "gender": "F",
  "hosteller": true,
  "imageUrl": "",
  "lastUpdateTime": "2024-01-12T01:39:27.852Z",
  "name": "Manya Singh",
  "parentName": "Arvind Kumar Singh",
  "parentNumber": "8789493664",
  "phoneNo": "9508300185",
  "regNo": "22103107032",
  "userId": 22103107032,
  "yearBack": "0"
};
export const CheckUser = ({ navigation }) => {     //checking user login data in database table if exit or not 
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
      [],
      function (txn, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          // txn.executeSql('DROP TABLE IF EXISTS table_user', []);
          txn.executeSql(
            // 'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_Id VARCHAR(15), user_password VARCHAR(20))',
            'CREATE TABLE IF NOT EXISTS table_user(' +
              'user_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
              'admissionType TEXT, ' +
              'admissionYear TEXT, ' +
              'batch TEXT, ' +
              'bioId TEXT, ' +
              'branchCode TEXT, ' +
              'collegeCode TEXT, ' +
              'currentSemester TEXT, ' +
              'emailId TEXT, ' +
              'gender TEXT, ' +
              'hosteller INTEGER, ' +
              'imageUrl TEXT, ' +
              'lastUpdateTime TEXT, ' +
              'name TEXT, ' +
              'parentName TEXT, ' +
              'parentNumber TEXT, ' +
              'phoneNo TEXT, ' +
              'regNo TEXT, ' +
              'userId INTEGER, ' +
              'yearBack TEXT, ' +
              'token TEXT, ' +
              'date TEXT)',
            []
          );
        }else {
          // Table exists, fetch column names
          txn.executeSql(
            "PRAGMA table_info('table_user')",
            [],
            function(txn, res) {
              const columnNames = [];
              for (let i = 0; i < res.rows.length; i++) {
                columnNames.push(res.rows.item(i).name);
              }
              console.log('Column names:', columnNames);
            },
            function(txn, error) {
              console.error('Error fetching column names:', error);
            }
          );
        }
      }
    );
  });
  Check_User({ navigation });
};

export const Check_User = ({ navigation }) => {
  db.transaction(function (tx) {
    tx.executeSql(
      'SELECT COUNT(*) AS totalRows FROM table_user',
      [],
      function (tx, results) {
        var totalRows = results.rows.item(0).totalRows;
        console.log('Total rows:', totalRows);
        if (totalRows > 0) {
          navigation.navigate('LoadingIndicator');
        }

      }
    );
  });
};


//Saving  user login data in database table 
export const RegisterUser = async ({ navigation, username, userId, password }) => {

  if (!username) {
    alert('Please fill Username');
    return;
  }
  if (!userId) {
    alert('Please fill UserId Number');
    return;
  }
  if (!password) {
    alert('Please fill Password');
    return;
  }

  // db.transaction(function (tx) {
  //   tx.executeSql(
  //     'INSERT INTO table_user (user_name, user_Id, user_password) VALUES (?,?,?)',
  //     [username, userId, password],
  //     (tx, results) => {
  //       console.log('Results', results.rowsAffected);
  //       if (results.rowsAffected > 0) {
  //         navigation.navigate('LoadingIndicator');
  //       } else alert('Registration Failed');
  //     }
  //   );
  // });

 let Login_Api = await Login_api(userId, password);

 if(Login_Api.response.message ==  "Logged in successfully"){
 const userData=Login_Api.details;
 const token= Login_Api.response.token;
if(userData.hosteller == true){
  userData.hosteller=1;
}else {
  userData.hosteller=0;
}


  // Extracting keys and values from userData object
  const columns =  [...Object.keys(userData), 'token', 'date'].join(',');
  const placeholders = Array(Object.keys(userData).length + 2).fill('?').join(',');

  // Extracting values from userData object and adding token and date values
  const values = [...Object.values(userData), token, new Date().toISOString()];
 console.log(columns);
 console.log(values);
 console.log(placeholders);
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user (${columns}) VALUES (${placeholders})',
      values,
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          navigation.navigate('LoadingIndicator');
        } else {
          alert('Registration Failed');
        }
      }
    );
  });
}
else {
  alert(Login_Api.response.message);
}

};

//Deleting user login data in database table 
export const deleteUser = ({ navigation }) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM  table_user',
      [],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          navigation.navigate('Login');
        }
      }
    );
  });

};


const getTokenAndDateFromDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT token, date FROM table_user ORDER BY date DESC LIMIT 1',
        [],
        (_, { rows }) => {
          const { token, date } = rows.item(0);
          resolve({ token, date });
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
// const fetchData = async () => {
//   try {
//     const { token, date } = await getTokenAndDateFromDatabase();
//     console.log('Token:', token);
//     console.log('Date:', date);
//   } catch (error) {
//     console.error('Error retrieving token and date:', error);
//   }
// };

// Function to retrieve user data from the database
const getUserDataFromDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user ORDER BY date DESC LIMIT 1',
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            const userData = rows.item(0);
            // Remove 'token' and 'date' properties from userData
            delete userData.token;
            delete userData.date;
            resolve(userData);
          } else {
            reject(new Error('No user data found in the database.'));
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// getUserDataFromDatabase()
//   .then(userData => {
//     console.log('User Data:', userData);
//   })
//   .catch(error => {
//     console.error('Error retrieving user data:', error);
//   });