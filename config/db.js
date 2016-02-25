'use strict';

const debug = require('debug')('pandora:databases');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

exports.mongodb = (options) => {
  debug('Mongodb initialize');
  options = options || { server: { poolSize: 10}};
  mongoose.connect('mongodb://mongodb:2017/pandora', options);

  const db = mongoose.connection;

  db.once('open', () => {
    debug('Connection open');
  });

  db.once('connected', () => {
    debug('Connected');
  });

  db.once('disconnected', () => {
    debug('Disconnected');
  });

  db.once('error', (error) => {
    debug('Connection error', error);
  });

  process.on('SIGINT', () => {
    db.close(() => {
      debug('Connection closed');
      process.exit(0);
    });
  });

};