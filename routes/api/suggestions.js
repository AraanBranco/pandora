'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/suggest');

router.get('/', controller.get);

module.exports = router;