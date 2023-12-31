const express = require('express');
const router = express.Router();

// define article ctrl
const articleCtrl = require('../controllers/article');

// use ctrl functions acc to route
router.get('/', articleCtrl.getAllArticles);
router.all('/article/edit/:id', articleCtrl.updateArticle);
router.get('/article/:slug', articleCtrl.getArticleBySlug);
router.get('/article/create', articleCtrl.showNewArticleForm);
router.post('/create', articleCtrl.createNewArticle);

// export router for use in def application file
module.exports = router;