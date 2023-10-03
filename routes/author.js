const express = require('express')
const router = express.Router()

// define article ctrl
const authorCtrl = require('../controllers/author')

// use ctrl functions acc to route
router.get('/:author_id', authorCtrl.getAuthorArticles)

// export router for use in def application file
module.exports = router