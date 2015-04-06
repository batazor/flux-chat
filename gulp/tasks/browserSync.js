var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config').browserSync;

gulp.task('browserSync', ['browserify', 'stylus'], function() {
  gulp.start('transfer', 'css', 'js', 'nodemon');
  browserSync.init(config);
});
