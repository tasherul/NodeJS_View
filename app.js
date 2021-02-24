const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const request = require('request');

app.use('/api', apiRouter);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// request({
//     url: 'http://localhost:3000/user/login',
//     json: true,
//     body: { "UserName": "user1", "Password": "123456" },
//     method: 'POST',
// }, (err, response, body) => {
//     console.log(body);
//     //return JSON.stringify(body, undefined, 4);
//     //res.status(200).json({request: JSON.stringify(body, undefined, 4) });
// });

app.use('/testing', (req, res, next) => {
    res.status(200).json({
        message: req.body.UserName
    });
});

app.use('/ids', (req, res, next) => {
    request({
        url: process.env.API_URI + 'user/ids',
        json: true,
        body: { "token": req.body.token },
        method: 'POST',
    }, (err, response, body) => {
        console.log(body);
        res.status(200).json(body);
    });
});

app.use('/getlist', (req, res, next) => {
    request({
        url: process.env.API_URI + 'question/list',
        json: true,
        body: { "token": req.body.token },
        method: 'POST',
    }, (err, response, body) => {
        console.log(body);
        res.status(200).json(body);
    });
});

app.use('/find', (req, res, next) => {
    request({
        url: process.env.API_URI + 'question/list-details',
        json: true,
        body: { "Uuid": req.body.Uuid },
        method: 'POST',
    }, (err, response, body) => {
        console.log(body);
        res.status(200).json(body);
    });
});

app.use('/submit', (req, res, next) => {
    request({
        url: process.env.API_URI + 'question/create',
        json: true,
        body: {
            "token": req.body.token,
            "question": req.body.question,
            "isactive": req.body.isactive,
        },
        method: 'POST',
    }, (err, response, body) => {
        console.log(body);
        res.status(200).json(body);
    });
});

app.use('/update', (req, res, next) => {
    request({
        url: process.env.API_URI + 'question/update',
        json: true,
        body: {
            "token": req.body.token,
            "question": req.body.question,
            "isactive": req.body.isactive,
            "Uuid":req.body.Uuid,
        },
        method: 'POST',
    }, (err, response, body) => {
        console.log(body);
        res.status(200).json(body);
    });
});


app.use('/delete', (req, res, next) => {
    request({
        url: process.env.API_URI + 'question/delete',
        json: true,
        body: {
            "Uuid": req.body.Uuid
        },
        method: 'POST',
    }, (err, response, body) => {
        console.log(body);
        res.status(200).json(body);
    });
});



app.use('/login', (req, res, next) => {
    const Data = {
        "UserName": req.body.UserName,
        "Password": req.body.Password
    }
    request({
        url: process.env.API_URI + 'user/login',
        json: true,
        body: { "UserName": req.body.UserName, "Password": req.body.Password },
        method: 'POST',
    }, (err, response, body) => {
        //console.log();
        //return JSON.stringify(body, undefined, 4);
        res.status(200).json({ request: JSON.stringify(body, undefined, 4) });
    });


});


app.use('/', (req, res, next) => {
    res.render('index');
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        return: false,
        message: error.message
    });
});

module.exports = app;