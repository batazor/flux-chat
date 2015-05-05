var configs = {
  development: {
    port: '8080',
    mongo: {
      url: 'mongodb://localhost/flux-chat',
      user: 'test',
      password: 'test'
    },
    session: {
      secret: 'devsecretkey!',
      key: 'devsecretkey!',
      cookie: {
        path: "/",
        httpOnly: true,
        maxAge : 3600000
      }
    }
  },

  production: {
    port: process.env.PORT,
    mongo: {
      url: 'mongodb://localhost/flux-chat',
      user: 'test',
      password: 'test'
    },
    session: {
      secret: 'devsecretkey!',
      key: 'devsecretkey!',
      cookie: {
        path: "/",
        httpOnly: true,
        maxAge : 3600000
      }
    }
  }
};

module.exports = function (env) {
  if (!env) { env = 'development'; }

  var config = configs[env];

  if (!config) { config = configs['development']; }

  return config;
};
