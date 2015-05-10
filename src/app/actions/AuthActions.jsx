var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var AuthConstants = require('../constants/AuthConstants.jsx');
var socket = io.connect();
var request = require('superagent');

var AuthActions = {

  logoutAuth: function() {
    request
      .get('/api/auth/logout')
      .end(function(err, res) {
        AppDispatcher.handleAction({
          actionType: AuthConstants.AUTH_LOGOUT
        });

        return window.location.reload();
      });
  },

  initSession: function() {
    request
      .get('/api/user')
      .end(function(err, res) {
        res = JSON.parse(res.text);

        if (res) {
          AppDispatcher.handleAction({
            actionType: AuthConstants.SESSION_INIT,
            session: res.session
          });
        } else {
          return window.location.replace("/#/login");
        }
      });
  }

};

module.exports = AuthActions;
