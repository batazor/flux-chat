var gulp = require('gulp');

gulp.task('build', ['webpack', 'less', 'js'], function() {
  gulp.start('css');
  gulp.start('minimize');
});
