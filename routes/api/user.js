'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/api/user');

router.post('/', controller.create);
router.get('/', passport.authenticate('jwt-api'), controller.one);
router.put('/', passport.authenticate('jwt-api'), controller.update);
router.delete('/', passport.authenticate('jwt-api'), controller.delete);

// Read one user
router.get('/:id', passport.authenticate('jwt-api'), controller.find);

module.exports = router;