var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var ChatConstants = require('../constants/ChatConstants.jsx');
var socket        = io.connect('http://localhost:8080');

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

  clickRoom: function(roomID) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CLICKING_ROOM,
      id: roomID
    });
  }

};
