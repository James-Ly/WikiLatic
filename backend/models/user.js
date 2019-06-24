const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = 'mongodb://localhost/wikipedia';
const connection = mongoose.createConnection(uri, {poolSize: 10});

const user = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = connection.model('User', user);