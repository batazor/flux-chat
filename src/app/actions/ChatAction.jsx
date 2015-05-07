var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var ChatConstants = require('../constants/ChatConstants.jsx');
var socket = io.connect();

module.exports = {

  initRoom: function() {
    socket.emit('initRoom');
  },

  creatingRoom: function(nameRoom) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATING_ROOM,
      name: nameRoom
    });
    socket.emit('createRoom', nameRoom);
  },

  clickRoom: function(room) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CLICKING_ROOM,
      id: room.open
    });

    socket.emit('clickRoom', room);
  },

  creatingMessage: function(message) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATING_MESSAGE,
      message: message
    });

    socket.emit('createMessage', message);
  }

};
