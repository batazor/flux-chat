const { EventEmitter } = require('events');
const _ = require('underscore');
const AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
const ChatConstants = require('../constants/ChatConstants.jsx');
const AuthStore = require('./AuthStore.jsx');

let _messages = [];

const MessageStore = _.extend({}, EventEmitter.prototype, {

  getMessage(room) {
    if (!_.isUndefined(room)) {
      return _.filter(_messages, message => message.roomId === room._id);
    }
    return [];
  },

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

});

// Register callback with AppDispatcher
AppDispatcher.register(payload => {
  const { action } = payload;

  switch (action.actionType) {

    case ChatConstants.INIT_MESSAGE:
      _messages = action.message;
      break;

    case ChatConstants.CREATING_MESSAGE:
      var date = Date.now();
      _messages.push({
        _id: `m_${date}`,
        roomId: action.message.roomId,
        userId: action.message.userId,
        isCreated: false,
        createAt: date,
        message: action.message.message,
      });
      break;

    case ChatConstants.CREATED_MESSAGE:
      _messages.push(action.message);
      _messages = _.filter(_messages, message => message.isCreated === true);
      break;

    default:
      return true;
  }

  MessageStore.emitChange();

  return true;
});

module.exports = MessageStore;
