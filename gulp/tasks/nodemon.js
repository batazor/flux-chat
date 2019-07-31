const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync");
const config = require("../config").nodemon;

gulp.task("nodemon", cb => {
  let called = false;
  return nodemon({
    script: config.script,
    ignore: config.ignore,
  })
    .on("start", () => {
      if (!called) {
        cb();
      }
      called = true;
    })
    .on("restart", () => {
      setTimeout(() => {
        browserSync.reload({
          stream: false,
        });
      }, 100);
    });
});
