var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var config = require('../config').nodemon;

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
      script: config.script,
      ignore: config.ignore
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
      }, 500);
    });
});
