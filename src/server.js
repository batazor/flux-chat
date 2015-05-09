// Require our dependencies
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var compression  = require('compression');
var express      = require('express');
var flash        = require('connect-flash');
var favicon      = require('serve-favicon');
var http         = require('http');
var logger       = require('morgan');
var mongoose     = require('mongoose');
var passport     = require('passport');
var path 	       = require('path');
var React        = require('react');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);
var config       = require('./config')(process.env.NODE_ENV);

// Create an express instance and set a port variable ==========================
var app = express();

// Connect to our mongo database ===============================================
mongoose.connect(config.mongo.url);
var dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection error:'));

dbConnection.once('open', function () {
  console.log('Mongo DB connection made');
});

// Passport configuration ======================================================
require('./config/passport')(passport);

// Set up session and passport
app.use(cookieParser());

app.use(session({
  key:    config.session.key,
  secret: config.session.secret,
  cookie: config.session.cookie,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore(config.mongo)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Other setting ===============================================================

// Favicon
app.use(favicon(__dirname + '/favicon.ico'));

// Form work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up our express application
app.use(compression());
app.use(express.static(__dirname + '/build/'));

// Set templating engine
app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'jade');

// set logger
app.use(logger('dev'));

// Routes ======================================================================
require('./routes')(app, passport);

// Start our server ============================================================
var server = http.createServer(app).listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});

// Initialize socket.io ========================================================
var io = require('socket.io').listen(server);
require('./socketio')(io);
