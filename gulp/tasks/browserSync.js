var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config').browserSync;

gulp.task('browserSync', ['browserify', 'transfer', 'stylus', 'css', 'js', 'nodemon'], function() {
  browserSync.init(config);
});
