const gulp = require("gulp");
const deploy = require("git-push");
const config = require("../config").push;

gulp.task("push", () => {
  gulp.src(config.transferFile, { base: "./" }).pipe(gulp.dest(config.build));

  deploy(`${__dirname}/../../build`, config.repository);
});
