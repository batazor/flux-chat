const AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
const ChatConstants = require("../constants/ChatConstants.jsx");

const socket = io.connect();

module.exports = {
  initRoom() {
    socket.emit("initRoom");
  },

  creatingRoom(nameRoom) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATING_ROOM,
      name: nameRoom
    });
    socket.emit("createRoom", nameRoom);
  },

  clickRoom(room) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CLICKING_ROOM,
      id: room.open
    });

    socket.emit("clickRoom", room);
  },

  creatingMessage(message) {
    AppDispatcher.handleAction({
      actionType: ChatConstants.CREATING_MESSAGE,
      message
    });

    socket.emit("createMessage", message);
  }
};
