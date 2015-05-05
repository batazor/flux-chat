module.exports = function(app, passport) {

  // ===========================================================================
  // HOME PAGE =================================================================
  // ===========================================================================
  app.get('/', function(req, res) {
    var port = process.env.PORT || 8080;

    res.render('index', {
      socketio: '//' + req.headers.host + '/socket.io/socket.io.js',
      socketioPort: '//' + req.headers.host + ':' + port
    });
  });

  // ===========================================================================
  // Auth ======================================================================
  // ===========================================================================
  // process the login form
  app.post('/api/auth/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(res.status(200).json({redirect: false}));
      }
      if (!user) {
        return next(res.status(200).json({redirect: false}));
      }
      req.logIn(user, function(err) {
        if (err) { console.log(err); return next(res.status(200).json({redirect: false})); }
        return res.status(200).json({redirect: true, session: req.user});
      });
    })(req, res, next);
  });

  // process the signup form
  app.post('/api/auth/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        console.log(err);
        return next(res.status(200).json({redirect: false}));
      }
      if (!user) {
        return next(res.status(200).json({redirect: false}));
      }
      req.logIn(user, function(err) {
        if (err) { console.log(err); return next(res.status(200).json({redirect: false})); }
        return res.status(200).json({redirect: true});
      });
    })(req, res, next);
  });

  // user logout
  app.get('/api/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // user info data
  app.get('/api/user', function(req, res) {
    if (req.isAuthenticated())
      return res.status(200).json({session: req.user});

    return res.status(200).json({session: false});
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
