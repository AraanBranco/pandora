'use strict';

const _ = require('lodash');
const User = require('../../models/user');


exports.create = (req, res) => {
  let data = _.pick(req.body, 'name', 'email', 'password');
  data.role = 'user';

  let user = new User(data);

  let savePromise = User.findOne({ email: user.email})
    .then((existUser) => {
      if(existUser) {
        throw new Error('User already exists');
      }
    });

  savePromise
    .then(() => user.save())
    .then((document) => {
      res.status(200).json({
        message: 'User created',
        user: _.omit(document, 'password');
      });
      res.end();
    })
    .catch((err) => {
      let error = new Error('Error when trying to register a user');
      error.status = 500;
      next(error);
    });
};

exports.one = (req, res) => {
  let user = req.user;
};