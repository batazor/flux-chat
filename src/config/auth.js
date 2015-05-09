var auth = {

  development: {

    facebookAuth: {
      clientID:     '---you-id---',
      clientSecret: '---you-secret---',
      callbackURL:  'http://localhost:3000/auth/facebook/callback'
    },

    twitterAuth: {
      consumerKey:    '---you-id---',
      consumerSecret: '---you-secret---',
      callbackURL:    'http://127.0.0.1:3000/auth/twitter/callback'
    },

    googleAuth: {
      clientID:     '---you-id---',
      clientSecret: '---you-secret---',
      callbackURL:  'http://localhost:3000/auth/google/callback'
    },

    githubAuth: {
      clientID:     '---you-id---',
      clientSecret: '---you-secret---',
      callbackURL:  'http://localhost:3000/auth/github/callback'
    },

    vkontakteAuth: {
      clientID:     '---you-id---',
      clientSecret: '---you-secret---',
      callbackURL:  'http://localhost:3000/auth/vkontakte/callback'
    }

  },

  production: {

    facebookAuth: {
      clientID:     process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
      callbackURL:  process.env.facebookCallbackURL,
    },

    twitterAuth: {
      consumerKey:    process.env.twitterKey,
      consumerSecret: process.env.twitterSecret,
      callbackURL:    process.env.twitterCallbackURL
    },

    googleAuth: {
      clientID:     process.env.googleKey,
      clientSecret: process.env.googleSecret,
      callbackURL:  process.env.googleCallbackURL
    },

    githubAuth: {
      clientID:     process.env.githubKey,
      clientSecret: process.env.githubSecret,
      callbackURL:  process.env.githubCallbackURL
    },

    vkontakteAuth: {
      clientID:     process.env.vkontakteKey,
      clientSecret: process.env.vkontakteSecret,
      callbackURL:  process.env.vkontakteCallbackURL
    }

  }
};

module.exports = function (env) {
  if (!env) { env = 'development'; }

  var config = auth[env];

  if (!config) { config = auth['development']; }

  return config;
};
