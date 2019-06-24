const express = require('express');
const router = express.Router();
const controller = require('../controllers/author-analytics.controller');

router.get('/user/:substring', controller.get_users);

router.get('/:user', controller.user_articles);

router.get('/user/:user/title/:title', controller.user_article_timestamps);
module.exports = router;