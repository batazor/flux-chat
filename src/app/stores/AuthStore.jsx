const { EventEmitter } = require('events');
const _ = require('underscore');
const AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
const AuthConstants = require('../constants/AuthConstants.jsx');

const sessionInit = {
  _id: false,
};

let session = sessionInit;

const AuthStore = _.extend({}, EventEmitter.prototype, {

  // Return Value
  getSession() {
    return session;
  },

  clearSession() {
    return sessionInit;
  },

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

});

// Register callback with AppDispatcher
AppDispatcher.register(payload => {
  const { action } = payload;

  switch (action.actionType) {
    case AuthConstants.SESSION_INIT:
      if (action.session) { session = action.session; }
      break;

    case AuthConstants.AUTH_LOGOUT:
      session = AuthStore.clearSession();
      break;

    default:
      return true;
  }

  AuthStore.emitChange();

  return true;
});

module.exports = AuthStore;
