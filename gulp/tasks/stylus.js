var concat = require('gulp-concat');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').stylus;

gulp.task('stylus', function() {
  return gulp.src(config.watch)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(concat('build-stylus.css'))
    .pipe(gulp.dest(config.dest));
});
