'use strict';

const bcrypt = require('bcrypt');

exports.hash = (password) => bcrypt.hashSync(password, 10);

exports.compare = bcrypt.compareSync;