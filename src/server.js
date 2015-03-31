// Require our dependencies
var http     = require('http'),
    path 	   = require('path'),
    express  = require('express'),
    mongoose = require('mongoose'),
    server   = require('http').createServer(app);

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// set up our express application
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
var io = require('socket.io').listen(server);

// launch ======================================================================
server.listen(port);
console.log('Server runs and listen on port ' + port);
