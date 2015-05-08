module.exports = function(socket) {

  // SignupAuth
  socket.on('socketSession', function() {
    socket.emit('socketSession', socket.client.request.user._id);
  });

};
