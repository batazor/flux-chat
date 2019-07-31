const ChatConstants = require("../../constants/ChatConstants.jsx");

module.exports = function(socket, AppDispatcher) {
  socket.on("initRoom", data => {
    AppDispatcher.handleAction({
      actionType: ChatConstants.INIT_ROOM,
      rooms: data
    });
  });

  socket.on("createRoom", data => {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATED_ROOM,
      room: data
    });
  });

  socket.on("addRoom", data => {
    AppDispatcher.handleAction({
      actionType: ChatConstants.ADD_ROOM,
      room: data
    });
  });

  socket.on("clickRoom", data => {
    AppDispatcher.handleAction({
      actionType: ChatConstants.INIT_MESSAGE,
      message: data
    });
  });

  socket.on("updatedRoom", data => {
    AppDispatcher.handleAction({
      actionType: ChatConstants.UPDATED_ROOM,
      message: data
    });
  });

  socket.on("createdMessage", data => {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATED_MESSAGE,
      message: data
    });
  });

  socket.on("updateUser", data => {
    AppDispatcher.handleAction({
      actionType: ChatConstants.UPDATE_USER,
      userOnline: data
    });
  });
};
