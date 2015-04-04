var concat = require('gulp-concat');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var config = require('../config').js;

gulp.task('js', function() {
  return gulp.src(config.watch)
    .on('error', handleErrors)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(config.dest));
});
