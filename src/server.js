// Require our dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const http = require('http');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path 	       = require('path');
const React = require('react');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config')(process.env.NODE_ENV);

// Create an express instance and set a port variable ==========================
const app = express();

// Connect to our mongo database ===============================================
mongoose.connect(config.mongo.url);
const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection error:'));

dbConnection.once('open', () => {
  console.log('Mongo DB connection made');
});

// Passport configuration ======================================================
require('./config/passport')(passport);

// Set up session and passport
app.use(cookieParser());

app.use(session({
  key: config.session.key,
  secret: config.session.secret,
  cookie: config.session.cookie,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore(config.mongo),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Other setting ===============================================================

// Favicon
app.use(favicon(`${__dirname}/favicon.ico`));

// Form work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up our express application
app.use(compression());
app.use(express.static(`${__dirname}/build/`));

// Set templating engine
app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'jade');

// set logger
app.use(logger('dev'));

// Routes ======================================================================
require('./routes')(app, passport);

// Start our server ============================================================
const server = http.createServer(app).listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});

// Initialize socket.io ========================================================
const io = require('socket.io').listen(server);
require('./socketio')(io);
