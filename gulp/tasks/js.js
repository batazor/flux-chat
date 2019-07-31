const concat = require("gulp-concat");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const config = require("../config").js;

gulp.task("js", () => gulp
    .src(config.watch)
    .pipe(plumber())
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(config.dest)));
