var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
  gulp.start('webpack');
  gulp.watch(config.css.watch, ['css']);
  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.js.watch, ['js']);
});
