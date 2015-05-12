var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var LocaleConstants = require('../constants/LocaleConstants.jsx');
var socket = io.connect();

// Define action methods
var LocaleActions = {

  updateLocale: function(locale) {
    AppDispatcher.handleAction({
      actionType: LocaleConstants.UPDATE_LOCALE,
      locale: locale
    });
  }

};

module.exports = LocaleActions;
