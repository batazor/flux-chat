module.exports = function (socket) {

  // SignupAuth
  socket.on('socketSession', () => {
    socket.emit('socketSession', socket.client.request.user._id);
  });

};
