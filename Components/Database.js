import { openDatabase } from 'react-native-sqlite-storage';
import { Get_Data_By_Token, Login_api } from './api';


var db = openDatabase({ name: 'UserDatabase.db' });


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
export const RegisterUser = async ({ navigation, userId, password }) => {

  if (!userId) {
    alert('Please fill UserId Number');
    return;
  }
  if (!password) {
    alert('Please fill Password');
    return;
  }

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
 
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user (' + columns + ') VALUES (' + placeholders + ')',
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


export const getTokenAndDateFromDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT userId, token, date FROM table_user ORDER BY date DESC LIMIT 1',
        [],
        (_, { rows }) => {
          const { userId, token, date } = rows.item(0);
          resolve({ userId, token, date });
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Function to retrieve user data from the database
export  const getUserDataFromDatabase = () => {
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
