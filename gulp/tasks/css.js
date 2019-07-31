const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const minifycss = require('gulp-minify-css');
const config = require('../config').css;

gulp.task('css', () => gulp.src([config.watch])
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest(config.dest)));
