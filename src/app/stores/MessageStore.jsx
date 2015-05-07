var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants.jsx');
var AuthStore = require('./AuthStore.jsx');
var _ = require('underscore');

var _messages = [];

var MessageStore = _.extend({}, EventEmitter.prototype, {

  getMessage: function(room) {
    if (!_.isUndefined(room)) {
      return _.filter(_messages, function(message) {
        return message.roomId === room._id;
      });
    }
    return [];
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case ChatConstants.INIT_MESSAGE:
      _messages = _.extend(_messages, action.message);
      break;

    case ChatConstants.CREATING_MESSAGE:
      var date = Date.now();
      _messages.push({
        _id: 'm_' + date,
        roomId: action.message.roomId,
        userId: action.message.userId,
        isCreated: false,
        createAt: date,
        message: action.message.message
      });
      break;

    case ChatConstants.CREATED_MESSAGE:
      _messages.push(action.message);
      _messages = _.uniq(_messages);
      _messages = _.map(_messages, function(message) {
        if (message.isCreated === false) {
          delete _messages.message;
          // console.log(message, ' <<<');
          return {};
        } else {
          return message;
        }
        //   var index = _messages.indexOf(message);
        //   if (index > -1) array.splice(index, 1);
      });
      break;

    default:
      return true;
  }

  MessageStore.emitChange();

  return true;
});

module.exports = MessageStore;
