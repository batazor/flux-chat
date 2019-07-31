const { EventEmitter } = require('events');
const _ = require('underscore');
const AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
const ChatConstants = require('../constants/LocaleConstants.jsx');

let locale = 'en';

const LocaleStore = _.extend({}, EventEmitter.prototype, {
  // Return Value
  getLocale() {
    return locale;
  },

  emitChange() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

});

// Register callback with AppDispatcher
AppDispatcher.register(payload => {
  const { action } = payload;

  switch (action.actionType) {
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
