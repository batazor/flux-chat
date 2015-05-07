var cookieParser = require("cookie-parser");
var User = require('../models/user');
var config = require('../config')('development');

var user = {};

module.exports = function(io, store, mongoose) {
  io.on('connection', function(socket) {

    // HelloWorldActions =======================================================
    require('./HelloWorldPage.js')(socket);
    // AuthAction ==============================================================
    require('./Auth.js')(socket, user);
    // Chat
    require('./Chat.js')(io, socket, user, mongoose);

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
        // If authorized, save socket
        User.update(
          {_id: session.passport.user},
          {$set: {socketID: socket.id}},
          function(err, numberAffected, raw){
            if (err) return handleError(err);

            user._id = session.passport.user;
          });
      }
    });
    next();
  });

  io.on('disconnect', function() {
    io.reconnect();
  });
};
