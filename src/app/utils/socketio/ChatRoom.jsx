var ChatConstants = require('../../constants/ChatConstants.jsx');

module.exports = function(socket, AppDispatcher) {

  socket.on('initRoom', function(data) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.INIT_ROOM,
      rooms: data
    });
  });

  socket.on('createRoom', function(data) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATED_ROOM,
      room: data
    });
  });

  socket.on('addRoom', function(data) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.ADD_ROOM,
      room: data
    });
  });

  socket.on('clickRoom', function(data) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.INIT_MESSAGE,
      message: data
    });
  });

  socket.on('updatedRoom', function(data) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.UPDATED_ROOM,
      message: data
    });
  });

  socket.on('createdMessage', function(data) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATED_MESSAGE,
      message: data
    });
  });

  socket.on('updateUser', function(data) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.UPDATE_USER,
      userOnline: data
    });
  });

};
