const mysql = require ('mysql');
const inquirer = require ('inquirer');
const consoleTable = require ('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'myRootPassword',
    database: 'team_db',
});

connection.connect((err) =>{
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    //afterConnection();
    optionsArray();
});

const optionsArray = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'Read all employees',
          'Read all departments',
          'Read all roles',
          'Create an employee',
          'Create a department',
          'Creata role',
          'Update a current role',
          'Delete an employee',
          'EXIT database'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Read all employees':
            readEmployees();
            break;
  
          case 'Read all departments':
            readDepartments();
            break;
  
          case 'Find data within a specific range':
            rangeSearch();
            break;
  
          case 'Search for a specific song':
            songSearch();
            break;
  
          case 'Find artists with a top song and top album in the same year':
            songAndAlbumSearch();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };
  

//remember to close connection! #memory issues! 
const afterConnection = () => {
    connection.query('SELECT * FROM employee',(err, res) => {
        if (err) throw err;
        console.log(res);




        connection.end();


    })
}

