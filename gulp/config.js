var path = {
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
    src: path.css + '/main.less',
    watch: path.css + '/*.less',
    dest: path.css
  },
  stylus: {
    watch: path.css + '/*.styl',
    dest: path.css
  },
  css: {
    src: path.css,
    watch: path.css + '/*.css',
    dest: path.src + '/build'
  },
  js: {
    watch: path.js + '/*.js',
    dest: path.src + '/build'
  },
  webpack: {
    src: __dirname + '/../src/app/app.jsx',
    dest: __dirname + '/../src/build',
    config: {
      entry: {app: __dirname + '/../src/app/app.jsx'},
      watch: watchWebpack,
      output: {
        path: __dirname + '/../src/build',
        publicPath: './',
        filename: 'bundle.js'
      },
      debug : true,
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }]
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      devtool: 'eval-source-map'
    }
  }
};
