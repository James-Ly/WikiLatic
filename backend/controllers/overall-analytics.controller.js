const Revision = require('../models/revision.js');
const Admin = require('../models/admin');
const Bot = require('../models/bot');

exports.all_titles = async (req, res) => {
    let result = await Revision.all_titles();
    res.json(result);
}

exports.num_of_revisions = async (req, res) => {
    try {
        let limit = parseInt(req.query.num);

        let results = await Promise.all([
            Revision.articles_by_num_of_revisions(limit, -1),
            Revision.articles_by_num_of_revisions(limit, 1)
        ]);

        doc = {most: results[0], least: results[1]}
        res.send(doc);
    } catch (error) {
        res.send(error);        
    }
}

exports.other_data = async (req, res) => {
    try {
        let admins = await Admin.get_users();
        let bots = await Bot.get_users();
        let not_regular = [...admins, ...bots];

        let longest_history = Revision.articles_by_age(-1);
        let shortest_history = Revision.articles_by_age(1);
        let most_regular = Revision.articles_by_regular_users(-1, not_regular);
        let least_regular = Revision.articles_by_regular_users(1, not_regular);

        let results = await Promise.all([ longest_history, shortest_history, most_regular, least_regular ]);

        doc = {longest: results[0], shortest: results[1], most: results[2], least: results[3]};

        res.send(doc);

    } catch (error) {
        res.send(error);
    }
}

exports.user_type_yearly_distribution = async (req, res) => {
    try {
        let admin_users = await Admin.get_users();
        let bot_users = await Bot.get_users();
        let not_regular = [...admin_users, ...bot_users];

        let regulars = Revision.regular_users_yearly_distribution(not_regular);
        let admins = Revision.users_yearly_distribution(admin_users);
        let bots = Revision.users_yearly_distribution(bot_users);
        let anons = Revision.anon_users_yearly_distribution();

        let results = await Promise.all([regulars, admins, bots, anons]);

        let doc = {
            regular: results[0],
            admin: results[1],
            bot: results[2],
            anon: results[3]
        }
        
        res.send(doc);
    } catch (error) {
        res.send(error);
    }
}

exports.user_type_distribution = async (req, res) =>{
    try {
        let admin_users = await Admin.get_users();
        let bot_users = await Bot.get_users();
        let not_regular = [...admin_users, ...bot_users];

        let regulars = Revision.revisions_by_regulars(not_regular);
        let admins = Revision.revisions_by_users(admin_users);
        let bots = Revision.revisions_by_users(bot_users);
        let anons = Revision.revisions_by_anons();

        let results = await Promise.all([regulars, admins, bots, anons]);

        let doc = [...results[0], ...results[1], ...results[2], ...results[3]]

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