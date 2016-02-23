'use strict';

const express = require('express');
const cors = require('cors');
const router = express.Router();

// Cors
router.use(cors());

// Routes - API
router.use('/api', require('./api'));

module.exports = router;