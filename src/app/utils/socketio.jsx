var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var socket = io.connect('http://localhost:8080');

// HelloWorldComponent
require('./socketio/HelloWorldComponent.jsx')(socket, AppDispatcher);
