const con = require('../utils/db.js')
const getAuthorArticles = (req, res) => {
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
}

module.exports = {
    getAuthorArticles
}