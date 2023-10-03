const express = require('express')
const router = express.Router()

// define article ctrl
const articleCtrl = require('../controllers/article')

// use ctrl functions acc to route
router.get('/', articleCtrl.getAllArticles)
router.get('/article/:slug', articleCtrl.getArticleBySlug)

// export router for use in def application file
module.exports = router