const Revision = require('../models/revision.js');
const Admin = require('../models/admin');
const Bot = require('../models/bot');

exports.get_users = async (req, res) => {
    try {
        let substring = req.params.substring;
        let result = await Revision.users(substring);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

exports.user_articles = async (req, res) => {
    try {
        let user = req.params.user;
        let result = await Revision.user_articles(user);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

exports.user_article_timestamps = async (req, res) =>{
    try {
        let user = req.params.user;
        let title = req.params.title;
        let result = await Revision.user_article_timestamps(user, title);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}