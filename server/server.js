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
    port     : process.env.DB_PORT,
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

/*+++++++++++++++++++++++++++++++++++++++
            Estimate
+++++++++++++++++++++++++++++++++++++++++*/

app.post('/api/estimate', (req, res) => {
    let sql = `SELECT t1.ingreName AS ingredient,consumed,supplied,(consumed+supplied)/2 AS estimate FROM
    (SELECT C.ingreID,ingreName,SUM(quantity) AS consumed FROM CONSUMELOG AS C JOIN INGREDIENTS AS I ON C.ingreID = I.ingreID WHERE cdate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY I.ingreID) t1
    INNER JOIN
    (SELECT S.ingreID,ingreName,SUM(quantity) AS supplied FROM SUPPLYLOG AS S JOIN INGREDIENTS AS I ON S.ingreID = I.ingreID WHERE sdate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY I.ingreID) t2
    ON t1.ingreID=t2.ingreID`;
    console.log(req.body)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log("Success!");
        res.send(results);
    });
});

/*+++++++++++++++++++++++++++++++++++++++
            Profit
+++++++++++++++++++++++++++++++++++++++++*/

app.post('/api/profit', (req, res) => {
    let sql = `SELECT pizzaName,SUM((cost*quantity)-(price*quantity)) AS profit FROM SALES AS S JOIN PIZZA AS P ON S.pizzaID=P.pizzaID WHERE saledate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY P.pizzaID`;
    console.log(req.body)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log("Success!");
        res.send(results);
    });
});

/*+++++++++++++++++++++++++++++++++++++++
            Sales
+++++++++++++++++++++++++++++++++++++++++*/

app.post('/api/sales', (req, res) => {
    let sql = `SELECT pizzaName,SUM(quantity) AS sold FROM SALES AS S JOIN PIZZA AS P ON S.pizzaID=P.pizzaID WHERE saledate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY P.pizzaID`;
    console.log(req.body)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log("Success!");
        res.send(results);
    });
});


app.listen('3001', () => {
    console.log('Server started on port 3001');
});