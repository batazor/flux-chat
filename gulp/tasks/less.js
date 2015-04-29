var concat = require('gulp-concat');
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').less;

gulp.task('less', function() {
  return gulp.src([config.src])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(concat('build-less.css'))
    .pipe(gulp.dest(config.dest));
});
