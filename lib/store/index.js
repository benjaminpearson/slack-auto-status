const _ = require('lodash');
const low = require('lowdb');
const path = require('path');
const db = low(path.join(__dirname, '..', '..', 'tmp', 'db.json'))

module.exports = db;
