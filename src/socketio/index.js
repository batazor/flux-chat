module.exports = function(io) {
  io.on('connection', function(socket) {

    // HelloWorldActions =======================================================
    require('./HelloWorldPage.js')(socket);
    // AuthAction ==============================================================
    require('./Auth.js')(socket);

  });

  io.on('disconnect', function() {
    io.reconnect();
  });
};
