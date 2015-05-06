var auth = {

  development: {

    facebookAuth: {
      clientID:     '832523613506734',
      clientSecret: '6a5f6b956ba05216852d51f3631759f3',
      callbackURL:  'http://localhost:3000/auth/facebook/callback'
    }

  },

  production: {

    facebookAuth: {
      clientID:     process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
      callbackURL:  process.env.facebookCallbackURL,
    }

  }
};

module.exports = function (env) {
  if (!env) { env = 'development'; }

  var config = auth[env];

  if (!config) { config = auth['development']; }

  return config;
};
