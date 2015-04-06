var path = {
  src:  "./src",
  css:  "./src/app/assets/css",
  js:   "./src/app/assets/js",
  img:  "./src/app/assets/images",
  font: "./src/app/assets/font"
};

module.exports = {
  browserSync: {
    proxy: "http://localhost:8080/",
    port: 3000,
    files: [__dirname + '/../src/build/*.*']
  },
  nodemon: {
    script: './src/server.js',
    ignore: [
      __dirname + '/../node_modules/',
      __dirname + '/tasks',
      __dirname + '/../*.*',
      __dirname + '/../src/build',
      __dirname + '/../src/app'
    ]
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
  browserify: {
    debug: true,
    bundleConfigs: [{
      entries: __dirname + '/../src/app/app.jsx',
      dest:    __dirname + '/../src/app/assets/js',
      outputName: 'build-react.js'
    }]
  }
};
