const Q = require('q');
const _ = require('underscore');
const Room = require('../models/room');
const Message = require('../models/message');
const User = require('../models/user');

module.exports = function (io, socket) {

  socket.on('initRoom', () => {
    Room
      .find({})
      .populate('lastMessage.author', '_id nickname')
      .exec((err, data) => {
        if (err) { return handleError(err); }

        return socket.emit('initRoom', data);
      });
  });

  socket.on('createRoom', nameRoom => {
    const room = new Room({
      name: nameRoom,
      createdAt: Date.now(),
      isCreated: true,
    });

    room.save((err, room, numberAffected) => {
      if (err) { return handleError(err); }

      socket.emit('createRoom', room);
      socket.broadcast.emit('addRoom', room);
    });

  });

  socket.on('clickRoom', room => {
    let socketRoom;

    // Add Room
    socket.join(room.open);
    // Delete Room -> update UserOnline
    if (room.close !== false) {
      socket.leave(room.close);

      socketRoom = io.sockets.adapter.rooms[room.close];
      if (socketRoom) {
        socketRoom = _.keys(socketRoom);

        User
          .find({ socketID: { $in: socketRoom } })
          .exec((err, data) => {
            if (err) { return handleError(err); }

            return io.sockets.in(room.close).emit('updateUser', data);
          });
      }
    }

    Message
      .find({ roomId: room.open })
      .populate('userId', '_id nickname avatar')
      .exec((err, data) => {
        if (err) { return handleError(err); }

        return io.sockets.in(room.open).emit('clickRoom', data);
      });

    socketRoom = io.sockets.adapter.rooms[room.open];
    if (socketRoom) {
      socketRoom = _.keys(socketRoom);

      User
        .find({ socketID: { $in: socketRoom } })
        .exec((err, data) => {
          if (err) { return handleError(err); }

          return socket.emit('updateUser', data);
        });
    }

  });

  socket.on('createMessage', newMessage => {

    const promiseSaveMessage = function () {
      const message = new Message({
        message: newMessage.message,
        roomId: newMessage.roomId,
        userId: socket.client.request.user._id,
        isCreated: true,
      });

      return message.save((err, room, numberAffected) => {
        if (err) { return handleError(err); }

        return message;
      });
    };

    const promiseFindOneMessage = function (message) {
      return Message
        .findOne({ _id: message._id })
        .populate('userId', '_id nickname avatar')
        .exec((err, data) => {
          if (err) { return handleError(err); }

          io.sockets.in(newMessage.roomId).emit('createdMessage', data);
          return data;
        });
    };

    const promiseUpdateRoom = function (message) {
      return Room.update(
        { _id: message.roomId },
        { $set: { updatedAt: Date.now(), lastMessage: { author: socket.client.request.user._id, text: message.message } } },
        (err, numberAffected, raw) => {
          if (err) { return handleError(err); }

          io.sockets.emit('updatedRoom', message);
        },
      );
    };

    Q.fcall(promiseSaveMessage)
      .then(promiseFindOneMessage)
      .then(promiseUpdateRoom)
      .catch(err => handleError(err))
      .done();

  });

};
