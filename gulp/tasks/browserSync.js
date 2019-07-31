const gulp = require("gulp");
const browserSync = require("browser-sync");
const config = require("../config").browserSync;

gulp.task("browserSync", ["less"], () => {
  gulp.start("css", "js", "nodemon");
  browserSync.init(config);
});
