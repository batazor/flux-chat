var auth = {

  development: {

    facebookAuth: {
      clientID:     '832523613506734',
      clientSecret: '6a5f6b956ba05216852d51f3631759f3',
      callbackURL:  'http://localhost:3000/auth/facebook/callback'
    },

    twitterAuth : {
      consumerKey:    'QtKb8nFbZuRrHItrvUIZKQASB',
      consumerSecret: 'dzVHmIed29ljUbLxd7UnTWODbGu2Mncux3m2BL9PoojZL8m0Tp',
      callbackURL:    'http://127.0.0.1:3000/auth/twitter/callback'
    },

  },

  production: {

    facebookAuth: {
      clientID:     process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
      callbackURL:  process.env.facebookCallbackURL,
    },

    twitterAuth : {
      consumerKey:    process.env.twitterKey,
      consumerSecret: process.env.twitterSecret,
      callbackURL:    process.env.twitterCallbackURL
    },

  }
};

module.exports = function (env) {
  if (!env) { env = 'development'; }

  var config = auth[env];

  if (!config) { config = auth['development']; }

  return config;
};
