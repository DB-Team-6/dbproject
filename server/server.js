const express = require('express');
const path = require('path');
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
app.use(express.static('client/build'))


// Snanity check

//Test
app.get('/api/test', (req, res) => {
    let sql = 'SELECT * FROM CONSUMELOG';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

/*+++++++++++++++++++++++++++++++++++++++
            EMPLOYEE
+++++++++++++++++++++++++++++++++++++++++*/

//            Login
app.post('/api/login', (req, res) => {
    password = req.cookies.auth ? req.cookies.auth : req.body.accesscode;
    let sql = `SELECT * FROM MANAGER WHERE accesscode='${password}';`;
    console.log(req.body)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        if(results.length!==0){
            res.cookie('auth', password).status(200).json({
                loginSuccess: true
            })
        }else{
            res.cookie('auth', "").status(200).json({
                loginSuccess: false
            })
        }
        console.log(results);
        // res.send(results);
    });
});

//            Logout

app.get('/api/logout', (req, res) => {
    password = "";
    console.log(req.body)
    res.cookie('auth', password).status(200).json({
        logoutSuccess: true
    })
});



//            Sales


app.post('/api/empsales', (req, res) => {
    let sql = `SELECT firstName,SUM(quantity) AS sales 
                FROM 
                SALES AS S JOIN PIZZA AS P ON S.pizzaID=P.pizzaID JOIN EMPLOYEE AS E ON S.empID=E.empID 
                WHERE
                saledate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY E.empID;`;
    console.log(req.body)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log("Success!");
        res.send(results);
    });
});

//            Profit


app.post('/api/empprofit', (req, res) => {
    let sql = `SELECT firstName,SUM((cost*quantity)-(price*quantity)) AS profit 
                FROM
                SALES AS S JOIN PIZZA AS P ON S.pizzaID=P.pizzaID JOIN EMPLOYEE AS E ON S.empID=E.empID 
                WHERE
                saledate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY E.empID;`;
    console.log(req.body)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log("Success!");
        res.send(results);
    });
});

/*+++++++++++++++++++++++++++++++++++++++
            Estimate
+++++++++++++++++++++++++++++++++++++++++*/

app.post('/api/estimate', (req, res) => {
    let sql = `SELECT t1.ingreName AS ingredient,consumed,supplied,(consumed+supplied)/2 AS estimate 
                FROM
                    (SELECT C.ingreID,ingreName,SUM(quantity) AS consumed 
                    FROM CONSUMELOG AS C JOIN INGREDIENTS AS I ON C.ingreID = I.ingreID 
                    WHERE 
                    cdate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY I.ingreID) t1
                INNER JOIN
                    (SELECT S.ingreID,ingreName,SUM(quantity) AS supplied 
                    FROM 
                    SUPPLYLOG AS S JOIN INGREDIENTS AS I ON S.ingreID = I.ingreID 
                    WHERE 
                    sdate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY I.ingreID) t2
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
    let sql = `SELECT pizzaName,SUM((cost*quantity)-(price*quantity)) AS profit 
                FROM 
                SALES AS S JOIN PIZZA AS P ON S.pizzaID=P.pizzaID 
                WHERE 
                saledate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY P.pizzaID`;
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
    let sql = `SELECT pizzaName,SUM(quantity) AS sold 
                FROM 
                SALES AS S JOIN PIZZA AS P ON S.pizzaID=P.pizzaID 
                WHERE 
                saledate BETWEEN '${req.body.startdate}' AND '${req.body.enddate}' GROUP BY P.pizzaID`;
    console.log(req.body)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log("Success!");
        res.send(results);
    });
});

if(process.env.NODE_ENV === 'production'){
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})