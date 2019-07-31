const AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
const ButtonConstants = require("../constants/ButtonConstants.jsx");

const socket = io.connect();

// Define action methods
const TestButtonActions = {
  addValue(count) {
    socket.emit("addCount", count);
  },

  initValue() {
    socket.emit("startCount");
  },

  socketSession() {
    socket.emit("socketSession");
  },
};

module.exports = TestButtonActions;
