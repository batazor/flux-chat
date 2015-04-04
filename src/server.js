// Require our dependencies
var http        = require('http');
var path 	      = require('path');
var express     = require('express');
// var bodyParser = require('body-parser');
// var multer     = require('multer');
// var mongoose    = require('mongoose');
// var morgan      = require('morgan');
// var compression = require('compression');
var server      = require('http').createServer(app);
// var io         = require('socket.io')(server);

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Form work
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());

// set logger
// app.use(morgan('tiny'));

// set up our express application
// app.use(compression());
app.use(express.static(__dirname + '/build/'));

// Set templating engine
app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'jade');

// Connect to our mongo database
// mongoose.connect('mongodb://localhost/flux-chat');

// Routes
require('./routes')(app);

// Start our server
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
// var io = require('socket.io').listen(server);

// Listen
server.listen(port);
