const ButtonConstants = require("../../constants/ButtonConstants.jsx");

module.exports = function (socket, AppDispatcher) {
  socket.on("initCount", data => {
    AppDispatcher.handleAction({
      actionType: ButtonConstants.BUTTON_INIT,
      count: data,
    });
  });

  socket.on("updCount", data => {
    AppDispatcher.handleAction({
      actionType: ButtonConstants.BUTTON_ADD,
      count: data,
    });
  });

  // Session
  socket.on("socketSession", user => {
    alert(`User ID: ${user}`);
  });
};
