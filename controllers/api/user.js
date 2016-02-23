'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('../../models/user');
const objectId = mongoose.Types.ObjectId;

exports.create = (req, res) => {
  let data = _.pick(req.body, 'name', 'email', 'password');
  data.role = 'user';

  let user = new User(data);

  user.password = user.generate(data.password);

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
        user: _.omit(document.toObject({virtuals: true}), 'password')
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

  User.findOne({ _id: user._id })
    .exec()
    .then((me) => {
      if(!me) {
        res.status(404).json({ message: "User not found" });
        res.end();
      } else {
        res.status(200).json(_.omit(me.toObject({virtuals: true}), 'password'));
        res.end();
      }
    });
};

exports.find = (req, res) => {
  let id = req.params.id;

  if(!objectId.isValid(id)) {
    res.status(404).json({ message: "ID incorrect" });
    res.end();
  } else {
    User.findOne({ _id: id })
      .exec()
      .then((user) => {
        if(!user) {
        res.status(404).json({ message: "User not found" });
        res.end();
      } else {
        res.status(200).json(_.omit(user.toObject({virtuals: true}), 'password'));
        res.end();
      }
      });
  }
};

exports.update = (req, res) => {
  let user = req.user;

  user = _.extend(user, req.body);

  user.save((err) => {
    if(err) {
      res.status(500).json({ message: "User not update", error: err });
      res.end();
    }

    res.status(200).json({ message: "User updated", user: user});
    res.end();
  });
};

exports.delete = (req, res) => {
  let user = req.user;

  User.findOne({ _id: user._id })
    .exec()
    .then((me) => {
      me.remove((err) => {
        if(err) {
          res.status(500).json({ message: "User not deleted", error: err });
          res.end();
        }

        res.status(200).json({ message: "User deleted" });
        res.end();
      });
    });
};