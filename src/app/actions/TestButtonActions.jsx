var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var ButtonConstants = require('../constants/ButtonConstants.jsx');
var socket = io.connect('http://localhost:8080');

// Define action methods
var TestButtonActions = {

  addValue: function(count) {
    socket.emit('addCount', count);
  },

  initValue: function() {
    socket.emit('startCount');
  }

};

socket.on('initCount', function(data) {
  AppDispatcher.handleAction({
    actionType: ButtonConstants.BUTTON_INIT,
    count: data
  });
});

socket.on('updCount', function(data) {
  AppDispatcher.handleAction({
    actionType: ButtonConstants.BUTTON_ADD,
    count: data
  });
});

module.exports = TestButtonActions;
