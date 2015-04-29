var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
  gulp.start('webpack');
  gulp.watch(config.css.watch, ['css']);
  gulp.watch(config.less.watch, ['less']);
  gulp.watch(config.js.watch, ['js']);

  gulp.watch(config.browserSync.files, require('browser-sync').reload);
});
