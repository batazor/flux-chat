module.exports = function(app, passport) {

  // ===========================================================================
  // HOME PAGE =================================================================
  // ===========================================================================
  app.get('/', function(req, res) {
    var port = process.env.PORT || 8080;

    res.render('index');
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

  // ===========================================================================
  // FACEBOOK ROUTES ===========================================================
  // ===========================================================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/#/login',
    failureRedirect : '/#/'
  }));

  // ===========================================================================
  // TWITTER ROUTES ============================================================
  // ===========================================================================
  // route for twitter authentication and login
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect : '/#/login',
    failureRedirect : '/#/'
  }));

  // ===========================================================================
  // GOOGLE ROUTES =============================================================
  // ===========================================================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/#/login',
    failureRedirect: '/#/'
  }));

  // ===========================================================================
  // GITHUB ROUTES =============================================================
  // ===========================================================================
  // route for github authentication and login
  app.get('/auth/github', passport.authenticate('github'));

  // handle the callback after github has authenticated the user
  app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect : '/#/login',
    failureRedirect : '/#/'
  }));

  // ===========================================================================
  // VK ROUTES =================================================================
  // ===========================================================================
  // route for vk authentication and login
  app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

  // handle the callback after vk has authenticated the user
  app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    successRedirect : '/#/login',
    failureRedirect : '/#/'
  }));

  // ===========================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) ===========
  // ===========================================================================
  // locally -------------------------------------------------------------------
  app.get('/connect/local', isLoggedIn, function(req, res) {
    res.redirect('/#/profile');
  });
  app.post('/connect/local', isLoggedIn, passport.authenticate('local-signup', {
    successRedirect: '/#/profile',
    failureRedirect: '/#/connect/local',
    failureFlash: true
  }));

  // facebook ------------------------------------------------------------------
  // send to facebook to do the authentication
  app.get('/connect/facebook', isLoggedIn, passport.authorize('facebook', { scope : 'email' }));

  // handle the callback after facebook has authorized the user
  app.get('/connect/facebook/callback', isLoggedIn, passport.authorize('facebook', {
    successRedirect: '/#/profile',
    failureRedirect: '/'
  }));

  // twitter -------------------------------------------------------------------
  // send to twitter to do the authentication
  app.get('/connect/twitter', isLoggedIn, passport.authorize('twitter'));

  // handle the callback after twitter has authorized the user
  app.get('/connect/twitter/callback', isLoggedIn, passport.authorize('twitter', {
    successRedirect: '/#/profile',
    failureRedirect: '/'
  }));

  // google --------------------------------------------------------------------
  // send to google to do the authentication
  app.get('/connect/google', isLoggedIn, passport.authorize('google', { scope : ['profile', 'email'] }));

  // the callback after google has authorized the user
  app.get('/connect/google/callback', isLoggedIn, passport.authorize('google', {
    successRedirect: '/#/profile',
    failureRedirect: '/'
  }));

  // github --------------------------------------------------------------------
  // send to google to do the authentication
  app.get('/connect/github', isLoggedIn, passport.authorize('github', { scope : 'email' }));

  // the callback after google has authorized the user
  app.get('/connect/github/callback', isLoggedIn, passport.authorize('github', {
    successRedirect: '/#/profile',
    failureRedirect: '/'
  }));

  // vkontakte -----------------------------------------------------------------
  // send to google to do the authentication
  app.get('/connect/vkontakte', isLoggedIn, passport.authorize('vkontakte', { scope : 'email' }));

  // the callback after google has authorized the user
  app.get('/connect/vkontakte/callback', isLoggedIn, passport.authorize('vkontakte', {
    successRedirect: '/#/profile',
    failureRedirect: '/'
  }));

  // ===========================================================================
  // UNLINK ACCOUNTS ===========================================================
  // ===========================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future
  // local ---------------------------------------------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/#/profile');
    });
  });

  // facebook ----------------------------------------------------------------
  app.get('/unlink/facebook', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/#/profile');
    });
  });

  // twitter -----------------------------------------------------------------
  app.get('/unlink/twitter', isLoggedIn, function(req, res) {
    var user           = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect('/#/profile');
    });
  });

  // google ------------------------------------------------------------------
  app.get('/unlink/google', isLoggedIn, function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect('/#/profile');
    });
  });

  // github ------------------------------------------------------------------
  app.get('/unlink/github', isLoggedIn, function(req, res) {
    var user          = req.user;
    user.github.token = undefined;
    user.save(function(err) {
      res.redirect('/#/profile');
    });
  });

  // vkontakte ---------------------------------------------------------------
  app.get('/unlink/vkontakte', isLoggedIn, function(req, res) {
    var user             = req.user;
    user.vkontakte.token = undefined;
    user.save(function(err) {
      res.redirect('/#/profile');
    });
  });

  // user logout
  app.get('/api/auth/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // user info data
  app.get('/api/user', isLoggedIn, function(req, res) {
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
    res.redirect('/#/login');
  }

};
