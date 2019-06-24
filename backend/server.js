const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const overallRouter = require('./routes/overall-analytics.router');
const articleRouter = require('./routes/article-analytics.router');
const authorRouter = require('./routes/author-analytics.router');
const userRouter = require('./routes/user.router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use('/author', authorRouter);
app.use('/individual', articleRouter);
app.use('/overall', overallRouter);
app.use('/user', userRouter);

const port = 3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});