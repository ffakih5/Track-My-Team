const mysql = require ('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'myRootPassword',
    database: 'team_db',
});

//remember to close connection! #memory issues! 
const afterConnection = () =>{
    connection.query('SELECT * FROM employee',(err, res) => {
        if (err) throw err;
        connection.end();


    })
}

connection.connect((err) =>{
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    afterConnection();
    
});

