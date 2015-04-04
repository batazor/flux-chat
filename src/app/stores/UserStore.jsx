var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ButtonConstants = require('../constants/ButtonConstants.jsx');
var _ = require('underscore');

var ButtonStore = _.extend({}, EventEmitter.prototype, {
  // Return Value
  getSession: function() {
    return false;
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
