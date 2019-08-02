// server.js

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "tryl",
    password: "tryl"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});