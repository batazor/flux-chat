var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants.jsx');
var _ = require('underscore');

var userOnline = [];

var UserOnlineStore = _.extend({}, EventEmitter.prototype, {
  // Return Value
  getUserOnline: function() {
    return userOnline;
  },

  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ChatConstants.UPDATE_USER:
      userOnline = action.userOnline;
      console.log(action.userOnline);
      break;

    default:
      return true;
  }

  UserOnlineStore.emitChange();

  return true;
});

module.exports = UserOnlineStore;
