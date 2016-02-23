'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Auth
router.use('/auth', require('./auth'));

// Users
router.use('/user', require('./user'));

// Get suggestion friends
router.use('/suggestions', passport.authenticate('jwt-api'), require('./suggestions'));

module.exports = router;