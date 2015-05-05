var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var ButtonConstants = require('../constants/ButtonConstants.jsx');
var socket = io.connect("#{ socketioPort }");

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

module.exports = TestButtonActions;
