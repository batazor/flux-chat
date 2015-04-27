var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var AuthConstants = require('../constants/AuthConstants.jsx');
var socket = io.connect('http://localhost:8080');
var request = require('superagent');
var Router = require('react-router');

var AuthActions = {

  signupAuth: function(form) {
    request
      .post('/api/user/signup')
      .accept('json')
      .send(form)
      .end(function(err, res) {
        res = JSON.parse(res.text);

        if (res.redirect) return window.location.replace("/#/profile");
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

          return window.location.replace("/#/profile");
        }
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
