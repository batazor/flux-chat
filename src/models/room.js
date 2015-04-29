var mongoose = require('mongoose');

var RoomSchema = mongoose.Schema({

  name:       String,
  isCreated:  Boolean,
  updatedAt:  Date,
  lastMessage: {
    author:   String,
    text:     String
  }

});

module.exports = mongoose.model('Room', RoomSchema);
