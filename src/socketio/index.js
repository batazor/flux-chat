module.exports = function(io) {
  io.on('connection', function(socket) {

    // test socketIO. HelloWorldPage ======================================
    require('./HelloWorldPage.js')(socket);

  });

  io.on('disconnect', function() {
    io.reconnect();
  });
};
