const Article = require("../models/article.model")

// show all articles (index)
const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving article data.'
            })
        } else {
            console.log(data)
            res.render('index', {
                articles : data
            })
        }
    })
};

// show article by a slug
const getArticleBySlug = (req, res) => {
    Article.getBySlug(req.params.slug, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Error occurred retrieving article data"
            })
        } else {
            console.log(data)
            res.render('article',
                {article: data})
        }
    })
};

//create new article
const createNewArticle = (req, res) => {
    //new article from POST data (example from form)
    console.log('new article')

    const newArticle = new Article ({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id
        })


    Article.createNew(newArticle, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Error occurred, while sending article data"
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
}
//display article form
const showNewArticleForm = (req, res) => {
    res.render('create')
};

// export ctrl functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    showNewArticleForm
}