var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var socket = io.connect("#{ socketioPort }");

// HelloWorldComponent
require('./socketio/HelloWorldComponent.jsx')(socket, AppDispatcher);

// ChatRoomSection
require('./socketio/ChatRoom.jsx')(socket, AppDispatcher);
