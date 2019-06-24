const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = 'mongodb://localhost/wikipedia';
const connection = mongoose.createConnection(uri, {poolSize: 10});

const admin = new Schema({
    user: String
});

const Admin = connection.model('Admin', admin, 'admins');

exports.get_users = () => {
    return Admin.distinct('user');
}

