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
    layoutsDir: __dirname + '/views/layouts/'
}))

//setup static public directory
app.use(express.static('public'))

//app.use(express.json())
//app.use(express.urlencoded({extended:true}))

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

//show all articles - index page
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    con.query(query, (err, result) => {
        if (err) throw err;
        res.render('index', {
            articles: result
        })
    })
});

//show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE slug = '${req.params.slug}'`;
    con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.render('article', {
            article: result
        })
    })
});

app.listen(3000, () => {
    console.log('web server is started')
})