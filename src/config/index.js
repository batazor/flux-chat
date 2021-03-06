const configs = {
  development: {
    port: '8080',
    mongo: {
      url: 'mongodb://localhost/flux-chat',
    },
    session: {
      secret: 'devsecretkey!',
      key: 'devsecretkey!',
      cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 3600000,
      },
    },
  },

  production: {
    port: process.env.PORT,
    mongo: {
      url: process.env.MONGOLAB_URI,
    },
    session: {
      secret: 'devsecretkey!',
      key: 'devsecretkey!',
    },
  },
};

module.exports = function (env) {
  if (!env) { env = 'development'; }

  let config = configs[env];

  if (!config) { config = configs.development; }

  return config;
};
