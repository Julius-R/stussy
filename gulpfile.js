const gulp = require('gulp'),
watch = require('gulp-watch'),
prefix = require('autoprefixer'),
postcss = require('gulp-postcss'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

gulp.task('styles', function(){
  return gulp.src('./app/assets/styles/styles.css')
  .pipe(postcss([
    cssImport,
    prefix,
    cssvars,
    nested
  ]))
  .pipe(gulp.dest('./app/css'));
})

gulp.task('watch', function(){

  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });

  watch('./app/index.html', function(){
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function(){
    gulp.start('cssInject');
  });

});

gulp.task('cssInject',['styles'], function(){
  return gulp.src('./app/css/styles.css')
  .pipe(browserSync.stream());
});
