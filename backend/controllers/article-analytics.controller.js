const Revision = require('../models/revision.js');
const Admin = require('../models/admin');
const Bot = require('../models/bot');
const wiki = require('../models/wikipedia');

exports.get_text_data = async (req, res)=>{

    try {
        let title = req.params.title;

        let latestDate = await Revision.article_latest_revision_date(title);
        latestDate = latestDate[0].timestamp.toISOString();
        
        let newRevisions = await wiki.get_new_revisions(title, latestDate);
        let newRevNum = Revision.add_new_revisions(newRevisions, title);

        let revisions = Revision.article_revisions(title);
        let topUsers = Revision.article_top_users(title);

        let result = await Promise.all([revisions, topUsers]);
        let doc = {newRevisions: newRevNum, revisions: result[0], topUsers: [...result[1]]}
        res.send(doc);
    } catch (error) {
        res.send(error);
    }
}

exports.get_article_user_yearly_distribution = async (req, res) =>{
    try {
        let title = req.params.title;
        let admin_users = await Admin.get_users();
        let bot_users = await Bot.get_users();
        let not_regular = [...admin_users, ...bot_users];

        let regulars = Revision.article_regular_users_yearly_distribution(title, not_regular);
        let admins = Revision.article_admin_users_yearly_distribution(title, admin_users);
        let bots = Revision.article_bot_users_yearly_distribution(title, bot_users);
        let anons = Revision.article_anon_users_yearly_distribution(title);
        
        let results = await Promise.all([regulars, admins, bots, anons]);

        let doc = {
            regular: results[0],
            admin: results[1],
            bot: results[2],
            anon: results[3] 
        }

        res.send(doc);
    } 
    catch (error) {
        res.send(error);
    }
}

exports.get_article_user_distribution = async (req, res) => {
    try {
        let title = req.params.title;

        let admin_users = await Admin.get_users();
        let bot_users = await Bot.get_users();
        let not_regular = [...admin_users, ...bot_users];

        let regulars = Revision.article_regulars(title, not_regular);
        let admins = Revision.article_admins(title, admin_users);
        let bots = Revision.article_bots(title, bot_users);
        let anons = Revision.article_anons(title);

        let results = await Promise.all([regulars, admins, bots, anons]);

        let doc = [...results[0], ...results[1], ...results[2], ...results[3]];

        let send = [
            {name: 'regular', num: doc[0].num},
            {name: 'admin', num: doc[1].num},
            {name: 'bot', num: doc[2].num},
            {name: 'anon', num: doc[3].num}
        ]
        
        res.send(send);
    } catch (error) {
        res.send(error);
    }
}

exports.get_top_user_data = async (req, res) => {
    try {
        let user = req.params.user;
        let title = req.params.title;

        let result = await Revision.article_top_user_yearly_revisions(user, title);

        res.send(result);

    } catch (error) {
        
    }
}