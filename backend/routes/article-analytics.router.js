const express = require('express');
const router = express.Router();
const controller = require('../controllers/article-analytics.controller');

router.get('/:title', controller.get_text_data);

router.get('/yearly-user-distribution/:title', controller.get_article_user_yearly_distribution);

router.get('/user-distribution/:title', controller.get_article_user_distribution);

router.get('/article/:title/user/:user', controller.get_top_user_data);

module.exports = router;