var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants.jsx');
var _ = require('underscore');
var MessageStore = require('./MessageStore.jsx');

var _rooms = [];

var sortRooms = function() {
  _rooms = _.sortBy(_rooms, function(room) {
    return room.updatedAt;
  }).reverse();
};

var RoomStore = _.extend({}, EventEmitter.prototype, {

  getCreatedRoomData: function(room) {
    var date = Date.now();
    return {
      _id:         room.id || 'r_' + date,
      name:        room.name,
      isCreated:   room.isCreated || false,
      isCurrent:   false,
      lastMessage: room.lastMessage,
      updatedAt:   room.updatedAt
    };
  },

  getAll: function() {
    return _rooms;
  },

  getCurrentRoom: function() {
    return _.find(_rooms, function(room) {
      return room.isCurrent;
    });
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
    case ChatConstants.INIT_ROOM:
      _rooms = [];
      _.map(action.rooms, function(room) {
        _rooms.push(room);
      });
      sortRooms();
      break;

    case ChatConstants.CREATING_ROOM:
      var newRoom = RoomStore.getCreatedRoomData({ name: action.name });
      _rooms.push(newRoom);
      break;

    case ChatConstants.CREATED_ROOM:
      _rooms = _.map(_rooms, function(room) {
        return (room.name === action.room.name && !room.isCreated) ? action.room : room;
      });
      break;

    case ChatConstants.CLICKING_ROOM:
      _rooms = _.map(_rooms, function(room) {
        room.isCurrent = room._id === action.id ? true : false;
        return room;
      });
      break;

    case ChatConstants.UPDATED_ROOM:
      _rooms = _.map(_rooms, function(room) {
        if (room._id === action.message.roomId) {
          room.lastMessage = { author: action.message.userId, text: action.message.message };
          room.updatedAt = action.message.updatedAt;
        }
        return room;
      });
      sortRooms();
      break;

    default:
      return true;
  }

  RoomStore.emitChange();

  return true;
});

module.exports = RoomStore;
