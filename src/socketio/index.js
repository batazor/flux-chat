var cookieParser = require("cookie-parser");
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);
var passportSocketIo = require("passport.socketio");
var User = require('../models/user');
var config = require('../config')(process.env.NODE_ENV);

var user = {};

module.exports = function(io) {
  io.on('connection', function(socket) {

    // HelloWorldActions =======================================================
    require('./HelloWorldPage.js')(socket);
    // AuthAction ==============================================================
    require('./Auth.js')(socket);
    // Chat
    require('./Chat.js')(io, socket);

  });

  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key:          config.session.key,
    secret:       config.session.secret,
    store:        new MongoStore(config.mongo),
    success:      onAuthorizeSuccess,
    fail:         onAuthorizeFail,
  }));

  function onAuthorizeSuccess(data, accept){
    console.log('successful connection to socket.io');

    accept();
  }

  function onAuthorizeFail(data, message, error, accept){

    if(error)
      accept(new Error(message));
  }

  io.on('disconnect', function() {
    io.reconnect();
  });
};
