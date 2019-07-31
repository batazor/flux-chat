const gulp = require('gulp');

gulp.task('build', ['webpack', 'less', 'js'], () => {
  gulp.start('css');
  gulp.start('minimize');
});
