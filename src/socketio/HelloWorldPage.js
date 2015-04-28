module.exports = function(socket) {
  // default count
  socket.on('startCount', function() {
    socket.emit('initCount', 101);
  });

  // click button
  socket.on('addCount', function(data) {
    data++;
    socket.emit('updCount', data);
  });
};
