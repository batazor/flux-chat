var webpack = require('webpack');
const path = require('path');

var PATH = {
  src:  "./src",
  css:  "./src/app/assets/css",
  js:   "./src/app/assets/js",
  img:  "./src/app/assets/images",
  font: "./src/app/assets/font"
};

var watchWebpack = process.env.NODE_ENV === 'production' ? false : true;

module.exports = {
  push: {
    repository: 'https://git.heroku.com/flux-chat.git',
    build: './build',
    transferFile: [
      __dirname + '/../src/build',
      __dirname + '/../src/build/**',
      __dirname + '/../src/config',
      __dirname + '/../src/config/**',
      __dirname + '/../src/models',
      __dirname + '/../src/models/**',
      __dirname + '/../src/socketio',
      __dirname + '/../src/socketio/**',
      __dirname + '/../src/templates',
      __dirname + '/../src/templates/**',
      __dirname + '/../src/*.js',
      __dirname + '/../src/favicon.ico',
      __dirname + '/../package.json',
      __dirname + '/../Procfile',
    ]
  },
  browserSync: {
    proxy: "http://localhost:8080/",
    port: 3000,
    files: [__dirname + '/../src/build/**']
  },
  nodemon: {
    script: './src/server.js',
    ignore: [
      __dirname + '/../node_modules',
      __dirname + '/../*.*',
      __dirname + '/../src/build',
      __dirname + '/../src/app',
      __dirname + '/../test',
      __dirname + '/../gulp',
    ]
  },
  less: {
    src: PATH.css + '/main.less',
    watch: PATH.css + '/*.less',
    dest: PATH.css
  },
  stylus: {
    watch: PATH.css + '/*.styl',
    dest: PATH.css
  },
  css: {
    src: PATH.css,
    watch: PATH.css + '/*.css',
    dest: PATH.src + '/build'
  },
  js: {
    watch: PATH.js + '/*.js',
    dest: PATH.src + '/build'
  },
  webpack: {
    src: __dirname + '/../src/app/app.jsx',
    dest: __dirname + '/../src/build',
    config: {
      entry: watchWebpack ? [
        // 'react-hot-loader/patch',
        // 'webpack-dev-server/client?http://localhost:4000',
        // 'webpack/hot/only-dev-server',
        __dirname + '/../src/app/app.jsx'
      ] : {
        app: __dirname + '/../src/app/app.jsx'
      },
      watch: watchWebpack,
      output: {
        path: __dirname + '/../src/build',
        publicPath: '/',
        filename: 'bundle.js'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ],
      debug : true,
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader!jsx-loader?harmony'
        }]
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      devtool: 'eval-source-map',
    }
  }
};
