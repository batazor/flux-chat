// =============================================================================
// Required plugins ============================================================
// =============================================================================
var gulp = require('gulp'),                  // Gulp JS
    stylus = require('gulp-stylus'),         // Stylus to CSS
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),          // React Build
    reactjade = require('react-jade'),
    concat = require('gulp-concat'),         // Concat
    browserSync = require('browser-sync'),   // Browser Sync
    nodemon = require('gulp-nodemon'),       // Node.js Server
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),  // Minification CSS
    uglify = require('gulp-uglify'),         // Minification JS
    gzip = require('gulp-gzip'),             // Compress
    notify = require('gulp-notify'),         // Logging
    plumber = require('gulp-plumber'),       // Not error
    util = require('gulp-util'),
    del = require('del');                    // Delete files/folders using globs

// =============================================================================
// Configuration ===============================================================
// =============================================================================
// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

path = {
  src: "./src",
  css: "./src/assets/css",
  js: "./src/assets/js",
  img: "./src/assets/images",
  font: "./src/assets/font"
};

watch = {
  jade:   path.src + '/components/**/*.jade',
  app:    path.src + '/app.jsx',
  css:    path.css + '/*.css',
  styl:   path.css + '/*.styl',
  sass:   path.css + '/*.sass',
  js:     path.js  + '/*.js',
  img:    path.img + '/**/*',
  all:    path.src + '/**/*'
};

public = {
  font: "./src/build/font/",
  all: "./src/build/"
};

build = {
  js: public.all + "*.js",
};

// =============================================================================
// Utils =======================================================================
// =============================================================================
// Standard handler
function standardHandler(err){
  util.log(util.colors.red('Error'), err.message);
}

// Handler for browserify
function browserifyHandler(err){
  standardHandler(err);
  this.end();
}

// =============================================================================
// Tasks =======================================================================
// =============================================================================
// Clean
gulp.task('clean', function(cb) {
  del([public.all + '*', 'src/assets/**/build*'], cb);
});

// Sync the File
gulp.task('transfer', function() {
  gulp.src([path.font + '/**']).pipe(gulp.dest(public.font));
});

// Compress thr File
gulp.task('compress', function() {
    gulp.src(build.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gzip())
    .pipe(gulp.dest(public.all))
    .pipe(notify({ message: 'Minification and compress build.js' }));
});

// Build Stylus
gulp.task('stylus', function() {
  return gulp.src(watch.styl)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(concat('build-stylus.css'))
    .pipe(gulp.dest(path.css))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Build CSS
gulp.task('css', function() {
  return gulp.src([
      path.css + "/materialize.min.css",
      path.css + "/build-stylus.css",
      watch.css
    ])
    .pipe(plumber())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('bundle.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(public.all))
    .pipe(notify({message: 'CSS task complete' }));
});

// Build JS
gulp.task('js', function() {
  return gulp.src(watch.js)
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(public.all))
    .pipe(notify({ message: 'JS task complete' }));
});

// Build bundle.js
gulp.task('browserify', function() {
  var bundler = browserify({
      entries: [watch.app],
      transform: [reactify, reactjade],
      debug: true,
      cache: {}, packageCache: {}, fullPaths: true
  });
  var watcher  = watchify(bundler);

  return watcher
    .on('update', function () {
      var updateStart = Date.now();
      watcher.bundle()
        .on('error', browserifyHandler)
        .pipe(source('build-react.js'))
        .pipe(gulp.dest(path.js));
    })
    .bundle()
    .on('error', browserifyHandler)
    .pipe(source('build-react.js'))
    .pipe(gulp.dest(path.js))
    .pipe(notify({message: 'Update React JS' }));
});

// Nodemon
gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
    script: './src/server.js',
    watch: ['./src/server.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function () {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

// Browser Sync
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init({
    proxy: "http://localhost:8080/",
    port: 3000,
    files: ['src/build/*.*']
	});
});

// =============================================================================
// Watch =======================================================================
// =============================================================================
gulp.task('watch', ['browserify'], function() {
  gulp.watch(watch.js, ['js']);
  gulp.watch(watch.styl, ['stylus']);
  gulp.watch(watch.css, ['css']);
  gulp.watch(watch.jade, ['browserify']);
});

// =============================================================================
// Default =====================================================================
// =============================================================================
gulp.task('default', ['transfer', 'watch', 'browser-sync']);

// =============================================================================
// Build =======================================================================
// =============================================================================
gulp.task('build', ['clean', 'stylus', 'css', 'browserify', 'js', 'compress']);
