var gulp = require('gulp');
var deploy = require('git-push');
var config = require('../config').push;

gulp.task('push', function() {
  gulp.src(config.transferFile, { base: './' })
    .pipe(gulp.dest(config.build));

  deploy(__dirname + '/../../build', config.repository);
});
