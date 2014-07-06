var
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  server = express();

mongoose.connect('localhost');

server.set('port', process.env.PORT || 3000);

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api', require('./routes/api'));

server.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});
