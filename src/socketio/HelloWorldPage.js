module.exports = function (socket) {
  // default count
  socket.on('startCount', () => {
    socket.emit('initCount', 101);
  });

  // click button
  socket.on('addCount', data => {
    data++;
    socket.emit('updCount', data);
  });
};
