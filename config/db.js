'use strict';

const debug = require('debug')('pandora:databases');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('config');

exports.mongodb = (options) => {
  options = options || { server: { poolSize: 10}};
  mongoose.connect(config.databases.mongodb.host, options);

  const db = mongoose.connection;

  debug('Mongodb initialize');

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

exports.neo4j = () => {
  debug('Neo4J initialize');
};