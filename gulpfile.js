// =============================================================================
// Required plugins ============================================================
// =============================================================================
var gulp = require('gulp');                       // Gulp JS
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    livereload = require('gulp-livereload'),       // Livereload fot Gulp
    streamify = require('gulp-streamify');

// =============================================================================
// Configuration ===============================================================
// =============================================================================
path = {
  SRC: './src',
  ENTRY_POINT: './src/app.js',
  MINIFIED_OUT: 'build.min.js',
};

watch = {
  js: [path.SRC + "/*/*.js", path.SRC + "./*.js"]
};

// =============================================================================
// Tasks =======================================================================
// =============================================================================
// Build JS
gulp.task('js', function(){
  return browserify({
      entries: [path.ENTRY_POINT],
      transform: [reactify],
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.SRC));
});

// =============================================================================
// Watch =======================================================================
// =============================================================================
gulp.task('watch', function() {
  // Pre-assembly project
  gulp.watch(watch.js, ['js']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(watch.all).on('change', livereload.changed);
});

// =============================================================================
// Default =====================================================================
// =============================================================================
gulp.task('default', function() {
  gulp.start('js');
});

// =============================================================================
// Build =======================================================================
// =============================================================================
gulp.task('build', function() {
  gulp.start('js');
});
