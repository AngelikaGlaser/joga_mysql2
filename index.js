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

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

const articleRoutes = require('./routes/article');
const con = require("./utils/db");
app.use('/', articleRoutes)
app.use('/article', articleRoutes)

app.get('/author/:author_id', (req, res) => {
    let get_author = `SELECT name FROM author WHERE id = ${req.params.author_id}`
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published' FROM article INNER JOIN author ON article.author_id = author.id WHERE author_id = ${req.params.author_id};`
    let author = ''
    con.query(get_author, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            author = result[0].name
        }
    })
    con.query(query, (err, result) => {
        if (err) throw err
        res.render('author', {
            articles: result,
            author: author
        })
    })
})


app.listen(3000, () => {
    console.log('web server is started')
})