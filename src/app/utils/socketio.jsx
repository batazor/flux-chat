const AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

const socket = io.connect();

// HelloWorldComponent
require('./socketio/HelloWorldComponent.jsx')(socket, AppDispatcher);

// ChatRoomSection
require('./socketio/ChatRoom.jsx')(socket, AppDispatcher);
