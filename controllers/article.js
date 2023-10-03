const con = require('../utils/db.js')
// show all articles (index)
const getAllArticles = (req, res) => {
    let sql = 'SELECT * FROM article'
    con.query(sql, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index', {
            articles: articles
        })
    })
}

// show article by a slug
const getArticleBySlug = (req, res) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE slug = '${req.params.slug}'`
    con.query(query, (err, result) => {
        if (err) throw err
        res.render('article', {
            article: result
        })
    })
}

// export ctrl functions
module.exports = {
    getAllArticles,
    getArticleBySlug
}