var ButtonConstants = require('../../constants/ButtonConstants.jsx');

module.exports = function(socket, AppDispatcher) {

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
    alert('User ID: ' + user);
  });

};
