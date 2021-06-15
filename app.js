const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');
const helpers = require('./helpers');


//Settings
const app = express();

app.use((req, res, next) => {
    res.locals.helpers = helpers;
    next();
});

app.use(express.json());

app.use('/', router);

//Mustache settings
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;