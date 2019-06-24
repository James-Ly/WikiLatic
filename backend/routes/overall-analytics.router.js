const express = require('express');
const router = express.Router();
const controller = require('../controllers/overall-analytics.controller');
//const Revision = require('../models/revision.js');

router.get('/', controller.all_titles);

router.get('/rev-number', controller.num_of_revisions);

router.get('/other-data', controller.other_data);

router.get('/distribution-by-year', controller.user_type_yearly_distribution);

router.get('/distribution-by-user', controller.user_type_distribution);

module.exports = router;