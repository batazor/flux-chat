const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const config = require('../config').js;

gulp.task('minimize', () => gulp.src([`${config.dest}/*.js`])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(config.dest)));
