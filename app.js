const mysql = require ('mysql');
const inquirer = require ('inquirer');
consoleTable = require ('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'myRootPassword',
    database: 'team_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    //afterConnection();
    options();
});

const options = () => {
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
          'Create a role',
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
  
          case 'Read all roles':
            readRoles();
            break;
  
          case 'Create an employee':
            createEmployee();
            break;
  
          case 'Create a department':
            createDepartment();
            break;
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
            //exitDB();
            break;

          
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        } 
      })
        .catch((err) => {
          console.log(err)

      })
  };
  

  function readEmployees () {
      const query = 'SELECT * FROM employee';
      connection.query(query,(err, res)  => {
        if (err) throw err; 
        console.table(res);
        options();
    });

  };

    function readDepartments () {
      const query = 'SELECT * FROM department';
      connection.query(query,(err, res) => {
        if (err) throw err;
        console.log(res);
        console.table(res);
        options();
    });

  };

  function readRoles () {
      console.log('readRoles');
      const query = 'SELECT * FROM roles';
      connection.query(query,(err, res) => {
          if (err) throw err;
          console.table(res);
          options()
      });

  };

  function createEmployee () {
      connection.query('SELECT * FROM roles', (err,res) => {
          if (err) throw err;
          inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employee's first name?",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employee's last name?",
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager's ID?",
                },
                {
                    name: 'role_id',
                    type: 'list',
                    choices: () => {
                        const roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;

                    },
                    message: "What is this employee's role?",
                }
            ]).then (function (answer) {
                let empRole;
                for (let r = 0; r < res.length; r++) {
                    if (res[r].title === answer.role) {
                        empRole = res[i].id;
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("Employee added!");
                        options();
                    });
            });
      });

  };

  function createDepartment () {
      inquirer
        .prompt([
            {
                name: 'addDepartment',
                type: 'input',
                message: "Which department would you like to add?",
            }
        ]).then (function (answer) {
            connection.query(
                'INSERT INTO department SET ? ',
                {
                    department_name: answer.addDepartment
                });
                const query = 'SELECT * FROM department';
                connection.query(query,(err, res) => { 
                    if (err) throw err;
                    console.log("Department added!");
                    console.table(res);
                    options()
                });
        });

  };

  function createRole () {
      connection.query('SELECT * FROM department', (err, res) => {
          if (err) throw err;

          inquirer
            .prompt([
                {
                    name: 'create_role',
                    type: 'input',
                    message: "What new role are you creating?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: "What is the salary of this role? (answer in numeric symbols)"
                },
                {
                    name: 'department',
                    type: 'list',
                    choices: () => {
                        const departmentArray = [];
                        for (let i = 0; i < res.length; i++) {
                            console.log(i);
                            departmentArray.push(res[i].department_name);
                        }
                        console.log(departmentArray);
                        return departmentArray;
                    }
                },
            ]).then(function (answer){
                let department_id;
                for(let d = 0; d < res.length; d++){
                    if (res[d].name === answer.department) {
                        department_id = res[d].id;
                    }
                }
                connection.query(
                    'INSERT INTO roles SET ?', 
                    {
                        title: answer.create_role,
                        salary: answer.salary,
                        department_id: department_id,
                    }, 
                    (err,res) => {
                        if (err) throw err;
                        console.log("New role added!");
                        console.table(res);
                        options();
                    });
            });
      });

  };

function updateRole() {
    const employeeArray = [];
    const rolesArray = [];

    connection.query(`SELECT CONCAT (employee.first_name, ' ', employee.last_name) as employee FROM employee` ,
    (error, res) => {
        if (error) throw error;
        for(let i = 0; i < res.length; i++){
          employeeArray.push(res[i].employee);
      }
      connection.query(
        `SELECT title FROM roles`, (err, res) => {
            if (err) throw err;
            for(let i = 0; i <res.length; i++) {
                rolesArray.push(res[i].title);
            }

            inquirer
                .prompt([
                {
                        name: 'name',
                        type: 'rawlist',
                        choices: employeeArray,
                        message: "Whose role are you updating?",
        
                },
                {
                        name: 'role',
                        type: 'input',
                        choices: rolesArray,
                        message: "What are you updating their role to?",
                },
            ]).then (answer => {
                
                let currentRole;
                const name = answer.name.split(' ');
                connection.query(
                    `SELECT id FROM roles WHERE title = '${answer}'`,
                    (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++){
                    currentRole = res[i].id;
                    }
                    
                    connection.query(
                        `UPDATE employee SET role_id = ${currentRole}WHERE first_name =  '${name[0]}' AND last_name = '${name[1]}';`,
                        (err, res) => {
                            if(err) throw err;
                            console.log("This employee's role has now been updated");
                            options();
                          }
                        );
                      }
                  );
               });
          }
      );
    }
  );
};
        

  
