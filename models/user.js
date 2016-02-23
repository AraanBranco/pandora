'use strict';

const mongoose = require('mongoose');
const schema = require('./schema/user');
const crypt = require('../helpers/crypt');

// Methods
schema.methods.comparePassword = function(password) {
  return crypt.compare(password, this.password);
};

const Model = mongoose.model('User', schema);

module.exports = Model;