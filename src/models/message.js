const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({

  message: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isCreated: { type: Boolean },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Message', MessageSchema);
