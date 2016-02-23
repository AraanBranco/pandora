'use strict';

const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes');
const nunjucks = require('nunjucks');
const app = express();

const port = process.env.NODE_PORT || 3000;

nunjucks.configure('views', {
  autoscape: true,
  express: app
});

// Configure parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Passport
app.use(passport.initialize());

// Routes
app.use('/', routes);

// 404
app.use((req, res) => {
  res.status(404);
  res.end();
});

require('./config/passport')();

app.listen(port, function() {
  console.log(`The PANDORA is open on port ${port}`);
});

module.exports = app;