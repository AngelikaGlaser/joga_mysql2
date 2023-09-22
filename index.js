const express = require('express')
const app = express()

const path = require('path')
//add template engine
const hbs = require('express-handlebars');
//set up template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

//setup static public directory
app.use(express.static('public'))

const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//create db connection
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