var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants.jsx');
var _ = require('underscore');

var _rooms = [];

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
      break;

    case ChatConstants.CREATING_ROOM:
      var newRoom = RoomStore.getCreatedRoomData({ name: action.name });
      _rooms.push(newRoom);
      break;

    case ChatConstants.CREATED_ROOM:
      _rooms = _.map(_rooms, function(room) {
        if (room.name === action.room.name) {
          return action.room;
        }
        return room;
      });
      break;

    // case ChatConstants.FETCHED_ROOMS:
    //   break;
    //
    // case ChatConstants.CLICKING_ROOM:
    //   break;
    //
    // case ChatConstants.UPDATED_ROOM:
    //   break;

    default:
      return true;
  }

  RoomStore.emitChange();

  return true;
});

module.exports = RoomStore;
