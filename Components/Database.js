import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db'});

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
            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_Id VARCHAR(15), user_password VARCHAR(20))',
            []
          );
        } 
      }
    );
  });
  Check_User({navigation});
};

   //Saving  user login data in database table 
export const RegisterUser = ({ navigation, username, userId, password }) => {

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

  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user (user_name, user_Id, user_password) VALUES (?,?,?)',
      [username, userId, password],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          navigation.navigate('LoadingIndicator');
        } else alert('Registration Failed');
      }
    );
  });
 
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
          navigation.navigate('Login') ;
        }
      }
    );
  });
 
};




export const Check_User =({navigation})=>{
  db.transaction(function(tx) {
    tx.executeSql(
        'SELECT COUNT(*) AS totalRows FROM table_user',
        [],
        function(tx, results) {
            var totalRows = results.rows.item(0).totalRows;
            console.log('Total rows:', totalRows);
            if(totalRows > 0){
              navigation.navigate('LoadingIndicator');
            }
           
        }
    );
});
};