var Room = require('../models/room');
var Message = require('../models/message');

module.exports = function(socket, user, mongoose) {

  socket.on('initRoom', function() {
    Room.find({}, function(err, data) {
      if (err) return handleError(err);

      return socket.emit('initRoom', data);
    });
  });

  socket.on('createRoom', function(nameRoom) {
    var room = new Room({
      name:      nameRoom,
      createdAt: Date.now(),
      isCreated: true
    });

    room.save(function(err, room, numberAffected) {
      if (err) return handleError(err);

      socket.emit('createRoom', room);
    });

  });

  socket.on('clickRoom', function(roomID) {
    Message
      .find({roomId: roomID})
      .populate('userId', '_id, local.email')
      .exec(function (err, data) {
        if (err) return handleError(err);

        return socket.emit('clickRoom', data);
      });
  });

  socket.on('createMessage', function(newMessage) {
    var message = new Message({
      message: newMessage.message,
      roomId: newMessage.roomId,
      userId: user._id,
      isCreated: true
    });

    message.save(function(err, room, numberAffected) {
      if (err) return handleError(err);

      Message
        .findOne({_id: message._id})
        .populate('userId', '_id, local.email')
        .exec(function (err, data) {
          if (err) return handleError(err);
          
          return socket.emit('createdMessage', data);
        });
    });

    Room.update(
      {_id: newMessage.roomId},
      {$set: {updatedAt: Date.now(), lastMessage: { author: user._id, text: newMessage.message }}},
      function(err, numberAffected, raw){
        if (err) return handleError(err);

        socket.emit('updatedRoom', message);
      });

  });

};
