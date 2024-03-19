const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // Replace 'your_password' with the actual password
    database: "assignment3"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/all', (req, res) => {
    const sql = "SELECT * FROM revenue where ticker='AAPL'";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get('/gpandrevenue', (req, res) => {
    const sql = "SELECT gp,revenue FROM revenue where ticker='AAPL'";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
app.get('/gprevenueperiod', (req, res) => {
    const sql = "SELECT gp,revenue,date FROM revenue where ticker='AAPL' and (year(date)>2018 and year(date)<2024)";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});


app.listen(8081, () => {
    console.log("Listening on port 8081");
});
