var concat = require('gulp-concat');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var config = require('../config').stylus;

gulp.task('stylus', function() {
  return gulp.src(config.watch)
    .on('error', handleErrors)
    .pipe(stylus())
    .pipe(concat('build-stylus.css'))
    .pipe(gulp.dest(config.dest));
});
