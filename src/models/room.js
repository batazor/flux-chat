const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({

  name: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isCreated: { type: Boolean },
  lastMessage: {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
  },

});

module.exports = mongoose.model('Room', RoomSchema);
