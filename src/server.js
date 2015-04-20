// Require our dependencies
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var compression  = require('compression');
var express      = require('express');
var session      = require('express-session');
var http         = require('http');
var multer       = require('multer');
var mongoose     = require('mongoose');
var logger       = require('morgan');
var path 	       = require('path');
var passport     = require('passport');
var React        = require('react');
var server       = require('http').createServer(app);
var config       = require('./config')('development');

// Create an express instance and set a port variable
var app = express();

// Connect to our mongo database ===============================================
mongoose.connect(config.mongo.url);
var dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection error:'));

dbConnection.once('open', function () {
  console.log('Mongo DB connection made');
});

// Passport configuration ======================================================
require('./config/passport')(app);

// Set up session and passport
app.use(session({
  secret: config.session.secret,
  key: config.session.key,
  cookie: config.session.cookie,
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser());

// Form work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// set logger
app.use(logger('dev'));

// set up our express application
app.use(compression());
app.use(express.static(__dirname + '/build/'));

// Set templating engine
app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'jade');

// Routes
require('./routes')(app, passport);

// Start our server
var server = http.createServer(app).listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);
require('./socketio')(io, passport);
