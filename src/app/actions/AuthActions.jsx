var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var AuthConstants = require('../constants/AuthConstants.jsx');
var socket = io.connect('http://localhost:8080');
var request = require('superagent');

var AuthActions = {

  signupAuth: function(form) {
    request
      .post('/api/user/signup')
      .accept('json')
      .send(form)
      .end(function(err, res) {
        res = JSON.parse(res.text);

        if (res.redirect) return window.location.reload();
      });
  },

  loginAuth: function(form) {
    request
      .post('/api/user/login')
      .accept('json')
      .send(form)
      .end(function(err, res) {
        res = JSON.parse(res.text);

        if (res.redirect) {
          AppDispatcher.handleAction({
            actionType: AuthConstants.SESSION_INIT,
            session: res.session
          });

          return window.location.reload();
        }
      });
  },

  logoutAuth: function() {
    request
      .get('/api/user/logout')
      .end(function(err, res) {
        AppDispatcher.handleAction({
          actionType: AuthConstants.AUTH_LOGOUT
        });
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
