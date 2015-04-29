var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var minifycss = require('gulp-minify-css');
var config = require('../config').css;

gulp.task('css', function() {
  return gulp.src([config.watch])
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest(config.dest));
});
