const { md5 } = require("blueimp-md5");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const VKStrategy = require("passport-vkontakte").Strategy;

// load up the user model
const User = require("../models/user");

// load the auth variables
const configAuth = require("./auth")(process.env.NODE_ENV);

// expose this function to our app using module.exports
module.exports = function (passport) {
  // ===========================================================================
  // passport session setup ====================================================
  // ===========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to desirialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // ===========================================================================
  // LOCAL SIGNUP ==============================================================
  // ===========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password,
        // we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {
          // check if the user is already logged in
          if (!req.user) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ "local.email": email }, (err, user) => {
              // if there are any errors, return the error
              if (err) {
                return done(err);
              }

              // check to see if theres already a user with that email
              if (user) {
                return done(
                  null,
                  false,
                  req.flash("signupMessage", "That email is already taken."),
                );
              }

              // if there is no user with that email
              // create the user
              const newUser = new User();

              // set the user's local credentials
              newUser.avatar = `//www.gravatar.com/avatar/${md5(
                email,
              )}?s=40&d=wavatar`;
              newUser.nickname = email.split("@")[0];
              newUser.email = email;

              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              // save the user
              newUser.save(err => {
                if (err) {
                  throw err;
                }
                return done(null, newUser);
              });
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            const { user } = req; // pull the user out of the session

            // update the current users facebook credentials
            user.local.email = email;
            user.local.password = password;

            // save the user
            user.save(err => {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      },
    ),
  );

  // ===========================================================================
  // LOCAL LOGIN ===============================================================
  // ===========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ "local.email": email }, (err, user) => {
          // if there are any errors, return the error before anything else
          if (err) {
            return done(err);
          }

          // if no user is found, return the message
          if (!user) {
            console.log(`User Not Found with email: ${email}`);
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found."),
            );
          }

          // if the user is found but the password is wrong
          if (!user.validPassword(password)) {
            console.log("Invalid Password");
            return done(
              null,
              false,
              req.flash("loginMessage", "Opps! Wrong password."),
            );
          }

          // all is well, return successful user
          return done(null, user);
        });
      },
    ),
  );

  // ===========================================================================
  // FACEBOOK ==================================================================
  // ===========================================================================
  passport.use(
    new FacebookStrategy(
      {
        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        passReqToCallback: true,
      },
      (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
          // check if the user is already logged in
          if (!req.user) {
            // find the user in the database based on their facebook id
            User.findOne({ "facebook.id": profile.id }, (err, user) => {
              if (err) {
                return done(err);
              }

              // if the user is found, then log them in
              if (user) {
                return done(null, user); // user found, return that user
              }
              // if there is no user found with that facebook id, create them
              const newUser = new User();

              // set all of the facebook information in our user model
              newUser.avatar = `//www.gravatar.com/avatar/${md5(
                profile.emails[0].value,
              )}?s=40&d=wavatar`;
              newUser.nickname = profile.displayName;
              newUser.email = profile.emails[0].value;

              newUser.facebook.id = profile.id;
              newUser.facebook.token = token;
              newUser.facebook.name = profile.displayName;
              newUser.facebook.email = profile.emails[0].value;

              // save our user to the database
              newUser.save(err => {
                if (err) {
                  throw err;
                }

                // if successful, return the new user
                return done(null, newUser);
              });
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            const { user } = req; // pull the user out of the session

            // update the current users facebook credentials
            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = `${profile.name.givenName} ${
              profile.name.familyName
            }`;
            user.facebook.email = profile.emails[0].value;

            // save the user
            user.save(err => {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      },
    ),
  );

  // ===========================================================================
  // TWITTER ===================================================================
  // ===========================================================================
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback: true,
      },
      (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ "twitter.id": profile.id }, (err, user) => {
              if (err) {
                return done(err);
              }

              if (user) {
                return done(null, user);
              }
              const newUser = new User();

              // set all of the twitter information in our user model
              newUser.avatar = profile.photos[0].value;
              newUser.nickname = profile.displayName;

              newUser.twitter.id = profile.id;
              newUser.twitter.token = token;
              newUser.twitter.username = profile.username;
              newUser.twitter.displayName = profile.displayName;

              // save our user into the database
              newUser.save(err => {
                if (err) {
                  throw err;
                }

                return done(null, newUser);
              });
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            const { user } = req; // pull the user out of the session

            // update the current users facebook credentials
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.username = profile.username;
            user.twitter.displayName = profile.displayName;

            // save the user
            user.save(err => {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      },
    ),
  );

  // ===========================================================================
  // GOOGLE ====================================================================
  // ===========================================================================
  passport.use(
    new GoogleStrategy(
      {
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true,
      },
      (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ "google.id": profile.id }, (err, user) => {
              if (err) {
                return done(err);
              }

              if (user) {
                return done(null, user);
              }
              const newUser = new User();

              // set all of the twitter information in our user model
              newUser.avatar = profile.photos[0].value;
              newUser.nickname = profile.displayName;

              newUser.google.id = profile.id;
              newUser.google.token = token;
              newUser.google.name = profile.displayName;
              newUser.google.email = profile.emails[0].value;

              // save our user into the database
              newUser.save(err => {
                if (err) {
                  throw err;
                }

                return done(null, newUser);
              });
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            const { user } = req; // pull the user out of the session

            // update the current users facebook credentials
            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value;

            // save the user
            user.save(err => {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      },
    ),
  );

  // ===========================================================================
  // GITHUB ====================================================================
  // ===========================================================================
  passport.use(
    new GitHubStrategy(
      {
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL,
        passReqToCallback: true,
      },
      (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ "github.id": profile.id }, (err, user) => {
              if (err) {
                return done(err);
              }

              if (user) {
                return done(null, user);
              }
              const newUser = new User();

              // set all of the twitter information in our user model
              newUser.avatar = profile._json.avatar_url;
              newUser.nickname = profile.displayName;

              newUser.github.id = profile.id;
              newUser.github.token = token;
              newUser.github.name = profile.displayName;
              newUser.github.email = profile.emails[0].value;

              // save our user into the database
              newUser.save(err => {
                if (err) {
                  throw err;
                }

                return done(null, newUser);
              });
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            const { user } = req; // pull the user out of the session

            // update the current users facebook credentials
            user.github.id = profile.id;
            user.github.token = token;
            user.github.name = profile.displayName;
            user.github.email = profile.emails[0].value;

            // save the user
            user.save(err => {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      },
    ),
  );

  // ===========================================================================
  // VK ========================================================================
  // ===========================================================================
  passport.use(
    new VKStrategy(
      {
        clientID: configAuth.vkontakteAuth.clientID,
        clientSecret: configAuth.vkontakteAuth.clientSecret,
        callbackURL: configAuth.vkontakteAuth.callbackURL,
        passReqToCallback: true,
      },
      (req, token, refreshToken, profile, done) => {
        process.nextTick(() => {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ "vk.id": profile.id }, (err, user) => {
              if (err) {
                return done(err);
              }

              if (user) {
                return done(null, user);
              }
              const newUser = new User();

              // set all of the twitter information in our user model
              newUser.avatar = profile.photos[0].value;
              newUser.nickname = profile.displayName;

              newUser.vkontakte.id = profile.id;
              newUser.vkontakte.token = token;
              newUser.vkontakte.name = profile.displayName;

              // save our user into the database
              newUser.save(err => {
                if (err) {
                  throw err;
                }

                return done(null, newUser);
              });
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            const { user } = req; // pull the user out of the session

            // update the current users facebook credentials
            user.vkontakte.id = profile.id;
            user.vkontakte.token = token;
            user.vkontakte.name = profile.displayName;

            // save the user
            user.save(err => {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      },
    ),
  );

  return passport;
};
