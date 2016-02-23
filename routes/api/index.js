'use strict';

const express = require('express');
const router = express.Router();

// Auth
router.use('/auth', require('./auth'));

module.exports = router;