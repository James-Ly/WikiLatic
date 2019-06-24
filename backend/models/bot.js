const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = 'mongodb://localhost/wikipedia';
const connection = mongoose.createConnection(uri, {poolSize: 10});

const bot = new Schema({
    user: String
});

const Bot = connection.model('Bot', bot, 'bots');

exports.get_users = () =>{
    return Bot.distinct('user');
}