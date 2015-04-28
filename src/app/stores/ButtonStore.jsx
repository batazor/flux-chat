var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ButtonConstants = require('../constants/ButtonConstants.jsx');
var _ = require('underscore');

// Add value button
var value = 0;

var ButtonStore = _.extend({}, EventEmitter.prototype, {
  // Return Value
  getValue: function() {
    return value;
  },

  // Emit Change event
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
  var text;

  switch(action.actionType) {
    // Respond to CART_REMOVE action
    case ButtonConstants.BUTTON_INIT:
      value = action.count;
      break;
    case ButtonConstants.BUTTON_ADD:
      value = action.count;
      break;

    default:
      return true;
  }

  ButtonStore.emitChange();

  return true;
});

module.exports = ButtonStore;
