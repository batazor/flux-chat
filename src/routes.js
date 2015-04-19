module.exports = function(app, passport) {

  // ===========================================================================
  // HOME PAGE =================================================================
  // ===========================================================================
  app.get('/', function(req, res) {
    res.render('index', {
      socketio: 'http://' + req.headers.host + '/socket.io/socket.io.js'
    });
  });

  // ===========================================================================
  // LOGIN =====================================================================
  // ===========================================================================
  // show the login form
  // app.get('/login', function(req, res) {
  //   res.render('auth/login', {
  //     user: req.user,
  //     message: req.flash('loginMessage')
  //   });
  // });

  // process the login form
  app.post('/user/login', passport.authenticate('local-login', {
    successRedirect : '/#/chat',
    failureRedirect : '/#/login',
    failureFlash : true
  }));

  // ===========================================================================
  // SIGNUP ====================================================================
  // ===========================================================================
  // show the signup form
  // app.get('/signup', function(req, res) {
  //   res.render('auth/signup', {
  //     user: req.user,
  //     message: req.flash('signupMessage')
  //   });
  // });

  // process the signup form
  app.post('/user/signup', passport.authenticate('local-signup', {
    successRedirect: '/#/profile',
    failureRedirect: '/#/signup',
    failureFlash: true
  }));

  // ===========================================================================
  // LOGOUT ====================================================================
  // ===========================================================================
  app.get('/user/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // ===========================================================================
  // PROFILE SECTION ===========================================================
  // ===========================================================================
  // show the user profile
  // app.get('/profile', isLoggedIn, function(req, res) {
  //   res.render('./profile/profile', {
  //     user : req.user,
  //     title: "Profile"
  //   });
  // });

  // JSON User
  app.get('/user/validateUsername', function(req, res) {
    console.log('/user/validateUsername: ' + JSON.stringify(req.query.email));

    User.findOne({'username': req.query.email}, function(err, email) {
      var response = {
        valid: true,
        error: false
      };

      if (err)
        response.error = true;

      if (user)
        response.valid = false;

      res.send(JSON.stringify(response));
    });
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
    // if user is authentificated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if the aren't redirect them to the home page
    console.log('Not authorized');
    res.redirect('/#/login');
  }

};
