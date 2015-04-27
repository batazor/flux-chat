var cookieParser = require("cookie-parser");
var config = require('../config')('development');

var user = {};

module.exports = function(io, store) {
  io.on('connection', function(socket) {

    // HelloWorldActions =======================================================
    require('./HelloWorldPage.js')(socket);
    // AuthAction ==============================================================
    require('./Auth.js')(socket, user);

  });

  io.use(function ioSession(socket, next) {
    // create the fake req that cookieParser will expect
    var req = {
      "headers": {
        "cookie": socket.request.headers.cookie,
      },
    };

    // run the parser and store the sessionID
    cookieParser(config.session.secret)(req, null, function() {});
    var name = config.session.key;
    socket.sessionID = req.signedCookies[name] || req.cookies[name];
    store.get(socket.sessionID, function(err, session) {
      if (err || !session) {
      } else {
        user._id = session.passport.user;
      }
    });
    next();
  });

  io.on('disconnect', function() {
    io.reconnect();
  });
};
