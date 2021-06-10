const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');

//Settings
const app = express();
app.use('/', router);

app.use(express.json());

//Mustache settings
app.engine('mst', mustache());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;