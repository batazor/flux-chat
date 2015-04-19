var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var AuthConstants = require('../constants/AuthConstants.jsx');
var socket = io.connect('http://localhost:8080');

var AuthActions = {

  signupAuth: function(form) {
    socket.emit('signupAuth', form);
  }

};

module.exports = AuthActions;
