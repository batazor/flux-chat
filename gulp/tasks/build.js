var gulp = require('gulp');

gulp.task('build', ['webpack', 'stylus', 'css', 'js', 'transfer']);
