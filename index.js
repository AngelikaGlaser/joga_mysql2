const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to joga_mysql database!");
});

app.listen(3006, () => {
    console.log('web server is started')
})