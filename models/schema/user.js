'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, require: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], require: true },
  interests: { type: Array },
  location: { type: [Number], index: '2dsphere' },
  created_at: { type: Date, default: Date.now }
});

// Index
schema.index({ email: 1 }, { unique: true });

// Virtuals

module.exports = schema;