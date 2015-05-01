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

};
