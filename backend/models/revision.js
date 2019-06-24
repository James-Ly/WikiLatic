const mongoose = require('mongoose');
const Admin = require('./admin')
const Bot = require('./bot')
const Schema = mongoose.Schema;

const uri = 'mongodb://localhost/wikipedia';
const connection = mongoose.createConnection(uri, {poolSize: 25});

const revision = new Schema({
    revid: Number,
    parentid: Number,
    minor: String,
    user: String,
    anon: String,
    timestamp: Date,
    size: Number,
    sha1: String,
    parsedcomment: String,
    title: String
});

const Revision = connection.model('Revision', revision, 'revisions');

exports.add_new_revisions = (revisions, title) => {
    let newRevisions = [];
    for(rev in revisions){
        revisions[rev].title = title;
        newRevisions.push(revisions[rev]);
    }
    newRevisions.shift();
    console.log(newRevisions);
    Revision.insertMany(newRevisions);
    return newRevisions.length;
}

exports.all_titles = () => {
    return Revision.distinct('title');
}

exports.all_users = () => {
    return Revision.aggregate()
    .match({anon: {$exists: false}})
    .group({_id: 'user'})
}

exports.articles_by_num_of_revisions = (limit, order) => {
    return Revision.aggregate()
    .group({_id: '$title', num_of_revisions: {$sum: 1}})
    .sort({num_of_revisions: order})
    .limit(limit);
}

exports.articles_by_age = (order) => {
    return Revision.aggregate()
    .group({_id: '$title', initial_date: {$min: '$timestamp'}})
    .project({title: '$title', age: {$trunc : {$divide: [{$subtract: [new Date, '$initial_date']}, 1000*60*60*24]}}})
    .sort({age: order})
    .limit(3);
}

exports.articles_by_regular_users = async (order, not_regular_users) => {
    return Revision.aggregate()
    .match({$and : [{'anon': {$exists: false}}, {'user': {$nin: not_regular_users}}]})
    .group({_id: '$title', num: {$sum: 1}})
    .sort({num: order})
    .limit(1);

}

exports.regular_users_yearly_distribution = (not_regular_users) =>{
    return Revision.aggregate()
    .match({$and : [{'user': {$nin: not_regular_users}}, {'anon': {$exists: false}}]})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.users_yearly_distribution = (users) => {
    return Revision.aggregate()
    .match({user: {$in: users}})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.anon_users_yearly_distribution = () =>{
    return Revision.aggregate()
    .match({anon: {$exists: true}})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.revisions_by_regulars = (not_regular_users) => {
    return Revision.aggregate()
    .match({$and : [{'user': {$nin: not_regular_users}}, {'anon': {$exists: false}}]})
    .group({_id: '', num: {$sum: 1}})
    .project({_id: 0});
}

exports.revisions_by_users = (users) => {
    return Revision.aggregate()
    .match({user: {$in: users}})
    .group({_id: '', num: {$sum: 1}})
    .project({_id: 0});
}

exports.revisions_by_anons = () => {
    return Revision.aggregate()
    .match({anon: {$exists: true}})
    .group({_id: '', num: {$sum: 1}})
    .project({_id: 0});
}

exports.article_revisions = (title) => {
    return Revision.aggregate()
    .match({title: title})
    .group({_id: '', num: {$sum: 1}})
    .project({_id: 0});
}

exports.article_top_users = (title) => {
    return Revision.aggregate()
    .match({title: title})
    .group({_id: '$user', revisions: {$sum: 1}})
    .sort({revisions: -1})
    .limit(5);
}

exports.article_regular_users_yearly_distribution = (title, not_regular_users) => {
    return Revision.aggregate()
    .match({$and: [{title: title}, {'user': {$nin: not_regular_users}}, {'anon': {$exists: false}}]})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.article_admin_users_yearly_distribution = (title, admins) => {
    return Revision.aggregate()
    .match({$and: [{title: title},{user: {$in: admins}}]})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.article_bot_users_yearly_distribution = (title, bots) => {
    return Revision.aggregate()
    .match({$and: [{title: title},{user: {$in: bots}}]})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.article_anon_users_yearly_distribution = (title) =>{
    return Revision.aggregate()
    .match({$and: [{title: title}, {anon: {$exists: true}}]})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.article_regulars = (title, not_regular_users) => {
    return Revision.aggregate()
    .match({$and: [{title: title}, {'user': {$nin: not_regular_users}}, {'anon': {$exists: false}}]})
    .group({_id: '', num: {$sum: 1}})
    .project({_id:0});
}

exports.article_admins = (title, admins) => {
    return Revision.aggregate()
    .match({$and: [{title: title},{user: {$in: admins}}]})
    .group({_id: '', num: {$sum: 1}})
    .project({_id:0});
}

exports.article_bots = (title, bots) => {
    return Revision.aggregate()
    .match({$and: [{title: title},{user: {$in: bots}}]})
    .group({_id: '', num: {$sum: 1}})
    .project({_id:0});
}

exports.article_anons = (title) => {
    return Revision.aggregate()
    .match({$and: [{title: title},{anon: {$exists: true}}]})
    .group({_id: '', num: {$sum: 1}})
    .project({_id:0});
}

exports.article_top_user_yearly_revisions = (user, title) => {
    return Revision.aggregate()
    .match({$and: [{title: title}, {user: user}]})
    .group({_id: {$year: '$timestamp'}, num: {$sum: 1}})
    .sort({_id: 1});
}

exports.article_latest_revision_date = (title) => {
    return Revision.find({title: title}, {_id: 0, timestamp: 1})
    .sort({timestamp: -1})
    .limit(1);
}

exports.users = (user) => {
    return Revision.aggregate()
    .match({user: {$regex: user, $options: 'i'}})
    .group({_id: '$user', revisions: {$sum: 1}})
}

exports.user_articles = (user) => {
    return Revision.aggregate()
    .match({user: user})
    .group({_id: '$title', revisions: {$sum: 1}})
    .sort({revisions: -1});
}

exports.user_article_timestamps = (user, title) => {
    return Revision.find({user: user, title: title}, {timestamp: 1, _id: 0})
    .sort({timestamp: 1});
}