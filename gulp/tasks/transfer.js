// Sync the File

var gulp = require('gulp');
var config = require('../config').transfer;

gulp.task('transfer', function() {
  gulp.src(config.src).pipe(gulp.dest(config.dest));
});
