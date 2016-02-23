'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/api/user');


router.post('/', controller.create);

router.get('/', passport.authenticate('jwt-api'), controller.one);