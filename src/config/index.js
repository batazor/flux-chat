var configs = {
  development: {
    port: '8080',
    mongo: {
      url: 'mongodb://localhost/flux-chat',
      user: 'test',
      password: 'test'
    },
    secretKey: 'devsecretkey!'
  },

  production: {
      port: process.env.PORT,
      mongo: {
        url: 'mongodb://localhost/flux-chat',
        user: 'test',
        password: 'test'
      },
      secretKey: 'devsecretkey!'
  }
};

module.exports = function (env) {
  if (!env) { env = 'development'; }

  var config = configs[env];

  if (!config) { config = configs['development']; }

  return config;
};
