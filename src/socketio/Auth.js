module.exports = function(socket, user) {

  // SignupAuth
  socket.on('socketSession', function() {
    socket.emit('socketSession', user);
  });

};
