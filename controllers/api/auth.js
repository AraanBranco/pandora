'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const _ = require('lodash');

exports.auth = (req, res, next) => {
  res.status(200).json({
    token: req.user.getToken(),
    user: _.omit(req.user.toObject(), 'password')
  });
  res.end();
};

exports.logout = (req, res) => {
  req.logout();

  res.status(200).json({ message: 'User logout' });
  res.end();
};

exports.unauthorized = (req, res, next) => {
  let error = new Error('Not authorized');
  error.status = 401;
  next(error);
};