/* jshint node:true */

'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');

var NAME = 'game';
var DEST = 'dist';
var SRC = {
  css: 'css/*.css',
  scss: 'scss/*.scss',
  img: 'img/*',
  js: 'js/index.js'
};

gulp.task('styles', function() {
  var cssStream = gulp.src(SRC.css);

  var scssStream = gulp.src(SRC.scss)
    .pipe(plugins.sass());

  return es.concat(scssStream, cssStream)
    .pipe(plugins.concat(NAME + '.css'))
    .pipe(gulp.dest(DEST))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(DEST))
    .pipe(plugins.notify({ message: 'Styles finished' }));
});

gulp.task('images', function() {
  return gulp.src(SRC.img)
    .pipe(plugins.cache(plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(DEST + '/images'))
    .pipe(plugins.notify({ message: 'Images finished' }));
});

gulp.task('scripts', function() {
  var debug = plugins.util.env.dev || false;

  return gulp.src(SRC.js)
    .pipe(plugins.jshint(('.jshintrc')))
    .pipe(plugins.browserify({ debug: debug }))
    .pipe(plugins.rename(NAME + '.js'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(gulp.dest(DEST))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(DEST))
    .pipe(plugins.notify({ message: 'Scripts finished | debug: ' + debug }));
});

gulp.task('clean', function() {
  return gulp.src([DEST], { read: false })
    .pipe(plugins.clean());
});

gulp.task('build', ['clean', 'styles', 'images', 'scripts']);

gulp.task('default', ['build']);
