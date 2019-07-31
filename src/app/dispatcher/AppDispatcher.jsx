const { Dispatcher } = require("flux");

// Create dispatcher instance
const AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function (action) {
  this.dispatch({
    source: "VIEW_ACTION",
    action,
  });
};

module.exports = AppDispatcher;
