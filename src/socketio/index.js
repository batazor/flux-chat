const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passportSocketIo = require('passport.socketio');
const User = require('../models/user');
const config = require('../config')(process.env.NODE_ENV);

module.exports = function (io) {
  io.on('connection', socket => {

    // Save socket.id for authenticated user
    if (socket.client.request.user._id !== undefined) {
      User.update(
        { _id: socket.client.request.user._id },
        { $set: { socketID: socket.id } },
        (err, numberAffected, raw) => {
          if (err) { return handleError(err); }
        },
      );
    }

    // HelloWorldActions =======================================================
    require('./HelloWorldPage.js')(socket);
    // AuthAction ==============================================================
    require('./Auth.js')(socket);
    // Chat
    require('./Chat.js')(io, socket);

  });

  io.use(passportSocketIo.authorize({
    cookieParser,
    key: config.session.key,
    secret: config.session.secret,
    store: new MongoStore(config.mongo),
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail,
  }));

  function onAuthorizeSuccess(data, accept) {
    console.log('successful connection to socket.io');

    accept();
  }

  function onAuthorizeFail(data, message, error, accept) {

    accept(null, false);
  }

  io.on('disconnect', () => {
    io.reconnect();
  });
};
