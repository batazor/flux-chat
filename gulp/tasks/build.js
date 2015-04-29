var gulp = require('gulp');

gulp.task('build', ['transfer', 'webpack', 'less', 'css', 'js']);
