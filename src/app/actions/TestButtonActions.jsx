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
  },

  socketSession: function() {
    socket.emit('socketSession');
  }

};

// Count Button
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

// Session
socket.on('socketSession', function(user) {
  alert('User ID: ' + user._id);
});

module.exports = TestButtonActions;
