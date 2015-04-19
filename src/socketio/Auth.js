module.exports = function(socket) {

  // SignupAuth
  socket.on('signupAuth', function(form) {
    console.log(form);
  });

};
