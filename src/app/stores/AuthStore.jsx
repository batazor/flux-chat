var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants.jsx');
var _ = require('underscore');

var session = {
  local: {}
};

var AuthStore = _.extend({}, EventEmitter.prototype, {

  // Return Value
  getSession: function() {
    return session;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  }
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case AuthConstants.SESSION_INIT:
      session = action.session;
      break;

    default:
      return true;
  }

  AuthStore.emitChange();

  return true;
});

module.exports = AuthStore;
