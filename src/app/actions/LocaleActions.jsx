const AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
const LocaleConstants = require("../constants/LocaleConstants.jsx");

const socket = io.connect();

// Define action methods
const LocaleActions = {
  updateLocale(locale) {
    AppDispatcher.handleAction({
      actionType: LocaleConstants.UPDATE_LOCALE,
      locale
    });
  }
};

module.exports = LocaleActions;
