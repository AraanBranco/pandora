'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/api/auth');

router.get('/unauthorized', controller.unauthorized);

router.post('/', passport.authenticate('email-api'), controller.auth);

module.exports = router;