var AppDispatcher = require('../dispatcher/AppDispatcher');
var ButtonConstants = require('../constants/ButtonConstants');

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
