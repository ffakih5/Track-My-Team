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
    optionsOne();
});

const optionsOne = () => {
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
  
          case 'Read all roles':
            readRoles();
            break;
  
          case 'Create an employee':
            createEmployee();
            break;
  
          case 'Create a department':
            songAndAlbumSearch();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };
  optionsTwo();
  const optionsTwo = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'Creat a role',
          'Update a current role',
          'Delete an employee',
          'EXIT database'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Create a role':
            createRole();
            break;
  
          case 'Update a current role':
            updateRole();
            break;
  
          case 'Delete an employee':
            deleteEmployee();
            break;
  
          case 'EXIT database':
            exitDB();
            break;

          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };

  const readEmployees = () => {
      const query = 'SELECT * FROM employee';
      connection.query((err, res)  => {
        if (err) throw err; 
        console.log(res);
        consoleTable('All employees:', res);
        optionsOne();
    });

  };

    const readDepartments = () => {
      const query = 'SELECT * FROM department';
      connection.query(query,(err, res) => {
        if (err) throw err;
        console.log(res);
        consoleTable('All Departments:', res);
        optionsOne();
    });

  };

  const readRoles = () => {
      const query = 'SELECT * FROM roles';
      connection.query(query,(err, res) => {
          if (err) throw err;
          consoleTable('All Roles;', res)
          optionsOne()

      });

  };

  const createEmployee = () => {
      connection.query('SELECT * FROM roles', (err,res) => {
          if (err) throw err;
          inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employee's first name?"
                }
            ])

      })

  }

  



//remember to close connection! #memory issues! 
const afterConnection = () => {
    connection.query('SELECT * FROM employee',(err, res) => {
        if (err) throw err;
        console.log(res);




        connection.end();


    })
}

