var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var ButtonConstants = require('../constants/ButtonConstants.jsx');

// Define action methods
var TestButtonActions = {

  // ADD
  addValue: function(count) {
    AppDispatcher.handleAction({
      actionType: ButtonConstants.BUTTON_ADD,
      count: count
    });
  }

};

module.exports = TestButtonActions;
