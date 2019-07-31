const gulp = require('gulp');
const webpack = require("gulp-webpack");
const config = require('../config').webpack;

gulp.task("webpack", () => gulp.src(config.src)
    .pipe(webpack(config.config))
    .pipe(gulp.dest(config.dest)));
