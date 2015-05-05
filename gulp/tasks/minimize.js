var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var config = require('../config').js;

gulp.task('minimize', function() {
  return gulp.src([config.dest + '/*.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});
