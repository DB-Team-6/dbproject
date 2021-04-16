const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Create connection
const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DB
});

// Check Connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Database Connected...');
});

const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


/*+++++++++++++++++++++++++++++++++++++++
            EMPLOYEE
+++++++++++++++++++++++++++++++++++++++++*/

// Add employee
app.post('/api/addemployee', (req, res) => {
    let sql = 'INSERT INTO EMPLOYEE SET ?';
    console.log(req.body)
    let query = db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Employee added...');
    });
});

//Get employee
app.get('/api/getemployee', (req, res) => {
    let sql = 'SELECT * FROM EMPLOYEE';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

//Get employees
app.get('/api/getemployee/:id', (req, res) => {
    let sql = `SELECT * FROM EMPLOYEE WHERE empID = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

//Get employees by ID
app.get('/api/getemployee/:id', (req, res) => {
    let sql = `SELECT * FROM EMPLOYEE WHERE empID = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

//Update employee by ID
app.post('/api/employeeupdate', (req, res) => {
    let sql = `UPDATE EMPLOYEE SET ? WHERE empID= ${req.body.empID}`;
    console.log(req.body)
    let query = db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Employee updated...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});