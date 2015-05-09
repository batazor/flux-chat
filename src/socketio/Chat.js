var Room = require('../models/room');
var Message = require('../models/message');
var User = require('../models/user');
var Q = require('q');
var _ = require('underscore');

module.exports = function(io, socket) {

  socket.on('initRoom', function() {
    Room
      .find({})
      .populate('lastMessage.author', '_id nickname')
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
      socket.broadcast.emit('addRoom', room);
    });

  });

  socket.on('clickRoom', function(room) {
    var socketRoom;

    // Add Room
    socket.join(room.open);
    // Delete Room -> update UserOnline
    if (room.close !== false) {
      socket.leave(room.close);

      socketRoom = io.sockets.adapter.rooms[room.close];
      if (socketRoom) {
        socketRoom = _.keys(socketRoom);

        User
          .find({socketID: { $in: socketRoom}})
          .exec(function (err, data) {
            if (err) return handleError(err);

            return io.sockets.in(room.close).emit('updateUser', data);
          });
      }
    }

    Message
      .find({roomId: room.open})
      .populate('userId', '_id nickname avatar')
      .exec(function (err, data) {
        if (err) return handleError(err);

        return io.sockets.in(room.open).emit('clickRoom', data);
      });

    socketRoom = io.sockets.adapter.rooms[room.open];
    if (socketRoom) {
      socketRoom = _.keys(socketRoom);

      User
        .find({socketID: { $in: socketRoom}})
        .exec(function (err, data) {
          if (err) return handleError(err);

          return socket.emit('updateUser', data);
        });
    }

  });

  socket.on('createMessage', function(newMessage) {

    var promiseSaveMessage = function() {
      var message = new Message({
        message: newMessage.message,
        roomId: newMessage.roomId,
        userId: socket.client.request.user._id,
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
        .populate('userId', '_id nickname avatar')
        .exec(function (err, data) {
          if (err) return handleError(err);

          io.sockets.in(newMessage.roomId).emit('createdMessage', data);
          return data;
        });
    };

    var promiseUpdateRoom = function(message) {
      return Room.update(
        {_id: message.roomId},
        {$set: {updatedAt: Date.now(), lastMessage: { author: socket.client.request.user._id, text: message.message }}},
        function(err, numberAffected, raw){
          if (err) return handleError(err);

          io.sockets.emit('updatedRoom', message);
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
