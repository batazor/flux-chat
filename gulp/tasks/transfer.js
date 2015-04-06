var gulp = require('gulp');

gulp.task('transfer', function() {
  gulp.src(__dirname + '/../../node_modules/materialize-css/font/**')
    .pipe(gulp.dest(__dirname + '/../../src/build/font'));
  gulp.src(__dirname + '/../../node_modules/materialize-css/bin/materialize.js')
    .pipe(gulp.dest(__dirname + '/../../src/app/assets/js'));
  gulp.src(__dirname + '/../../node_modules/materialize-css/bin/materialize.css')
    .pipe(gulp.dest(__dirname + '/../../src/app/assets/css'));
});
