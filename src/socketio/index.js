module.exports = function(io) {
  io.on('connection', function(socket) {

    // HelloWorldActions =======================================================
    require('./HelloWorldPage.js')(socket);
    // AuthAction ==============================================================
    require('./Auth.js')(socket);

  });

  io.use(function(socket, next) {
    var handshakeData = socket.request;
    // make sure the handshake data looks good as before
    // if error do this:
      // next(new Error('not authorized');
    // else just call next
    // console.log(handshakeData);
    next();
  });

  io.on('disconnect', function() {
    io.reconnect();
  });
};
