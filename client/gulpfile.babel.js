var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var runSeq = require('run-sequence')

gulp.task('heroku:production', function(){
  runSeq('clean', 'build', 'minify')
})

gulp.task("default", ["transpile"]);

gulp.task("transpile", () => {

  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n");
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));

});


gulp.task("watch", ["transpile"], () => {
  gulp.watch("src/**/*", ["transpile"]);
});

