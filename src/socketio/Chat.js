var Room = require('../models/room');

module.exports = function(socket, user, mongoose) {

  socket.on('initRoom', function() {
    Room.find({}, function(err, data) {
      if (err) {
        return console.log(err);
      }

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
      if (err) {
        console.log('Error:', err);
      }
      socket.emit('createRoom', room);
    });
    
  });

};
