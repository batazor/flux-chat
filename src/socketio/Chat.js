var Room = require('../models/room');
var Message = require('../models/message');
var Q = require('q');

module.exports = function(socket, user, mongoose) {

  socket.on('initRoom', function() {
    Room
      .find({})
      .populate('lastMessage.author', '_id, nickname, avatar')
      .exec(function(err, data) {
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
      .populate('userId', '_id, nickname, avatar')
      .exec(function (err, data) {
        if (err) return handleError(err);

        return socket.emit('clickRoom', data);
      });
  });

  socket.on('createMessage', function(newMessage) {

    var promiseSaveMessage = function() {
      var message = new Message({
        message: newMessage.message,
        roomId: newMessage.roomId,
        userId: user._id,
        isCreated: true
      });

      return message.save(function(err, room, numberAffected) {
        if (err) return handleError(err);

        return message;
      });
    };

    var promiseFindOneMessage = function(message) {
      return Message
        .findOne({_id: message._id})
        .populate('userId', '_id, nickname, avatar')
        .exec(function (err, data) {
          if (err) return handleError(err);

          socket.emit('createdMessage', data);
          return data;
        });
    };

    var promiseUpdateRoom = function(message) {
      return Room.update(
        {_id: message.roomId},
        {$set: {updatedAt: Date.now(), lastMessage: { author: message.userId, text: message.message }}},
        function(err, numberAffected, raw){
          if (err) return handleError(err);

          socket.emit('updatedRoom', message);
        });
    };

    Q.fcall(promiseSaveMessage)
      .then(promiseFindOneMessage)
      .then(promiseUpdateRoom)
      .catch(function(err) {
        return handleError(err);
      })
      .done();

  });

};
