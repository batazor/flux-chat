const AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
const AuthConstants = require("../constants/AuthConstants.jsx");

const socket = io.connect();
const request = require("superagent");

const AuthActions = {
  logoutAuth() {
    request.get("/api/auth/logout").end((err, res) => {
      AppDispatcher.handleAction({
        actionType: AuthConstants.AUTH_LOGOUT,
      });

      return window.location.reload();
    });
  },

  initSession() {
    request.get("/api/user").end((err, res) => {
      res = JSON.parse(res.text);

      if (res) {
        AppDispatcher.handleAction({
          actionType: AuthConstants.SESSION_INIT,
          session: res.session,
        });
      } else {
        return window.location.replace("/#/login");
      }
    });
  },
};

module.exports = AuthActions;
