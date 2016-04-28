'use strict';
//require("time-require");

/**************************************************************
enter
  gulpt build --sorted
in terminal to see why gulp is loading slow.
you need to uncomment require("time-require"); above
***************************************************************/

//General Plugins
  var gulp = require('gulp');
  var livereload = require( 'gulp-livereload' );
  var del = require('del');
  var runSequence = require('run-sequence');

//SASS Plugins
  var sass = require('gulp-sass');
  var autoprefixer = require('gulp-autoprefixer');

//JS Plugins
  var jshint = require('gulp-jshint');


/**************************************************************
  Cleaning Up Files
***************************************************************/

gulp.task('clean', function() {
  setTimeout(function(){
    del('./*.css');
  }, 300)
});

/**************************************************************
  Gulp SASS Compilation
***************************************************************/

 gulp.task('sassy', function() {
  setTimeout(function(){
   return gulp.src('./sass/**/*.scss')
     .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
     .pipe(gulp.dest('./'))
     .pipe(livereload());
  }, 300)
 });

/**************************************************************
  JS Hinting & Minification(later) Compilation
***************************************************************/

gulp.task('jshint', function() {
  setTimeout(function(){
    return gulp.src('./js/scripts.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(livereload());
  }, 300)
});

/**************************************************************
  NSA'ing all your files
***************************************************************/
gulp.task('watch', ['sassy'], function() {

// /**************************************************************
//   You need to configure the host and port
//   You must also update your port number in footer.php
//   Port Numbers:
//     David : 35729
//     Brian : 35730
//     Scott : 35731
//     Ruben : 35732
//     Mike  : 35733
//     Kris  : 35734
//     Matt  : 35735
// ***************************************************************/
  livereload.listen({host:'10.10.10.11', port : '35729'});

  //watch sassy files
  gulp.watch('./sass/**/*.scss', ['sassy']).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

  //watch scripts.js
  gulp.watch('./js/scripts.js', ['jshint']).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

  //watch all php files
  gulp.watch('./**/*.php' ).on( 'change', function( file ) {
    livereload.changed( file );
  });

});