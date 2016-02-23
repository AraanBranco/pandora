'use strict';

const express = require('express');
const router = express.Router();

// Auth
router.use('/auth', require('./auth'));

// Users
router.use('/user', require('./user'));

module.exports = router;