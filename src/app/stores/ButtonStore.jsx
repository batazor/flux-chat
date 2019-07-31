const { EventEmitter } = require("events");
const _ = require("underscore");
const AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
const ButtonConstants = require("../constants/ButtonConstants.jsx");

// Add value button
let value = 0;

const ButtonStore = _.extend({}, EventEmitter.prototype, {
  // Return Value
  getValue() {
    return value;
  },

  // Emit Change event
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
  },
});

// Register callback with AppDispatcher
AppDispatcher.register(payload => {
  const { action } = payload;
  let text;

  switch (action.actionType) {
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
