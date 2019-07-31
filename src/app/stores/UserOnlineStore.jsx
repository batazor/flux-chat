const { EventEmitter } = require("events");
const _ = require("underscore");
const AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
const ChatConstants = require("../constants/ChatConstants.jsx");

let userOnline = [];

const UserOnlineStore = _.extend({}, EventEmitter.prototype, {
  // Return Value
  getUserOnline() {
    return userOnline;
  },

  emitChange() {
    this.emit("change");
  },

  // Add change listener
  addChangeListener(callback) {
    this.on("change", callback);
  },

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener("change", callback);
  }
});

// Register callback with AppDispatcher
AppDispatcher.register(payload => {
  const { action } = payload;

  switch (action.actionType) {
    case ChatConstants.UPDATE_USER:
      userOnline = action.userOnline;
      break;

    default:
      return true;
  }

  UserOnlineStore.emitChange();

  return true;
});

module.exports = UserOnlineStore;
