var md5 = require('blueimp-md5').md5;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth')(process.env.NODE_ENV);

// expose this function to our app using module.exports
module.exports = function(passport) {
  // ===========================================================================
  // passport session setup ====================================================
  // ===========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to desirialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // ===========================================================================
  // LOCAL SIGNUP ==============================================================
  // ===========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password,
    // we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email' : email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done (err);

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

          // if there is no user with that email
          // create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.avatar = '//www.gravatar.com/avatar/' + md5(email) + '?s=40&d=wavatar';
          newUser.nickname = email.split('@')[0];
          newUser.email = email;
          
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });

        }
      });
    });
  }));

  // ===========================================================================
  // LOCAL LOGIN ===============================================================
  // ===========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' : email }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err)
        return done(err);

      // if no user is found, return the message
      if (!user) {
        console.log('User Not Found with email: ' + email);
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }

      // if the user is found but the password is wrong
      if (!user.validPassword(password)) {
        console.log('Invalid Password');
        return done(null, false, req.flash('loginMessage', 'Opps! Wrong password.'));
      }

      // all is well, return successful user
      return done(null, user);
    });

  }));

  // ===========================================================================
  // FACEBOOK ==================================================================
  // ===========================================================================
  passport.use(new FacebookStrategy({
      // pull in our app id and secret from our auth.js file
      clientID:     configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL:  configAuth.facebookAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {

      process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

          if (err)
            return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.avatar         = '//www.gravatar.com/avatar/' + md5(profile.emails[0].value) + '?s=40&d=wavatar';
            newUser.nickname       = profile.displayName;
            newUser.email          = profile.emails[0].value;

            newUser.facebook.id    = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name  = profile.displayName;
            newUser.facebook.email = profile.emails[0].value;

            // save our user to the database
            newUser.save(function(err) {
              if (err)
                throw err;

              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });
      });
    }));

  return passport;
};
