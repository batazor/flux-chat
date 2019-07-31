const { EventEmitter } = require('events');
const _ = require('underscore');
const AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
const ChatConstants = require('../constants/ChatConstants.jsx');

let _rooms = [];

const sortRooms = function () {
  _rooms = _.sortBy(_rooms, room => room.updatedAt).reverse();
};

const RoomStore = _.extend({}, EventEmitter.prototype, {

  getCreatedRoomData(room) {
    const date = Date.now();
    return {
      _id: room.id || `r_${date}`,
      name: room.name,
      isCreated: room.isCreated || false,
      isCurrent: false,
      lastMessage: room.lastMessage,
      updatedAt: room.updatedAt,
    };
  },

  getAll() {
    return _rooms;
  },

  getCurrentRoom() {
    return _.find(_rooms, room => room.isCurrent);
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
    case ChatConstants.INIT_ROOM:
      _rooms = [];
      _.map(action.rooms, room => {
        _rooms.push(room);
      });
      sortRooms();
      break;

    case ChatConstants.ADD_ROOM:
      _rooms.push(action.room);
      break;

    case ChatConstants.CREATING_ROOM:
      var newRoom = RoomStore.getCreatedRoomData({ name: action.name });
      _rooms.push(newRoom);
      break;

    case ChatConstants.CREATED_ROOM:
      _rooms = _.map(_rooms, room => ((room.name === action.room.name && !room.isCreated) ? action.room : room));
      break;

    case ChatConstants.CLICKING_ROOM:
      _rooms = _.map(_rooms, room => {
        room.isCurrent = room._id === action.id;
        return room;
      });
      break;

    case ChatConstants.UPDATED_ROOM:
      _rooms = _.map(_rooms, room => {
        if (room._id === action.message.roomId) {
          room.lastMessage = { author: { nickname: action.message.userId.nickname }, text: action.message.message };
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
