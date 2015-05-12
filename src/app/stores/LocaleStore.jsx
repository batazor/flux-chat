var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/LocaleConstants.jsx');
var _ = require('underscore');

var locale = 'en';

var LocaleStore = _.extend({}, EventEmitter.prototype, {
  // Return Value
  getLocale: function() {
    return locale;
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
    case ChatConstants.UPDATE_LOCALE:
      console.log(action.locale, '<<<<');
      locale = action.locale;
      break;

    default:
      return true;
  }

  LocaleStore.emitChange();

  return true;
});

module.exports = LocaleStore;
