const concat = require("gulp-concat");
const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const config = require("../config").less;

gulp.task("less", () =>
  gulp
    .src([config.src])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(concat("build-less.css"))
    .pipe(gulp.dest(config.dest))
);
