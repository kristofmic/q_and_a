var
  express = require('express'),
  api = express();

api.use('/shows', require('./api/shows'));

module.exports = api;
