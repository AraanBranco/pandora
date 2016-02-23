'use strict';

const bcrypt = require('bcrypt');

exports.compare = bcrypt.compareSync;