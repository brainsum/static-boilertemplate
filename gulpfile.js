'use strict';

// Load Gulp and plugins
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var stylelint = require('gulp-stylelint');
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var npmDist = require('gulp-npm-dist');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var pump = require('pump');
var purge = require('gulp-css-purge');
var reload = browserSync.reload;

// Store all paths
var paths = {
  sass: './sources/scss/**/*.scss',
  js: './sources/javascripts/*.js',
  img: './sources/images/',
  html: './public/views/*.html'
};

/**
 * Copy dependencies
 *
 * from npm_modules to ./public/vendors/
 * @see https://github.com/dshemendiuk/gulp-npm-dist
 */
gulp.task('copy:vendors', function vendorCopy() {
  gulp.src(npmDist(), { base: './node_modules' }).pipe(
    gulp.dest('./public/vendors')
  );
});

// Sass task for develepoment with live injecting into all browsers
gulp.task('sass', function sassTask() {
  return gulp
    .src(paths.sass)
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sass({ outputStyle: 'expanded', precision: 10 }))
    .on('error', sass.logError)
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      autoprefixer({
        browsers: ['last 3 version', 'ie >= 10']
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(reload({ stream: true }));
});

/**
 * Sass task for production with linting, to be stored in Git (run before
 * commit)
 */
gulp.task('sass:production', function sassProdTask() {
  return gulp
    .src(paths.sass)
    .pipe(stylelint({
      fix: true,
      reporters: [
        { formatter: 'verbose', console: true }
      ]
    }))
    .pipe(sass({ outputStyle: 'compact', precision: 10 }))
    .on('error', sass.logError)
    .pipe(
      autoprefixer({
        browsers: ['last 3 version', 'ie >= 10']
      })
    )
    .pipe(csscomb())
    .pipe(
      purge({
        trim: true,
        shorten: true,
        verbose: true
      })
    )
    .pipe(gulp.dest('./public/css'));
});

// Sass linting task
gulp.task('sass:lint', function sassLintTask() {
  return gulp
    .src(paths.sass)
    .pipe(stylelint({
      fix: true,
      reporters: [
        { formatter: 'verbose', console: true }
      ]
    }));
});

// JavaScript task
gulp.task('scripts', function scriptsTask() {
  pump([
    gulp.src(paths.js),
    eslint({ fix: true }),
    eslint.format(),
    eslint.failAfterError(),
    uglify(),
    gulp.dest('./public/javascripts')
  ]);
});

// Serve and watch the scss, javascript and html files for changes
gulp.task('browser-sync', function reloadTask() {
  browserSync.init({
    // injectChanges: true,
    proxy: 'boilertemplate.test'
  });
  gulp.watch(paths.sass, ['sass']).on('change', browserSync.reload);
  gulp.watch(paths.js, ['scripts']).on('change', browserSync.reload);
  gulp.watch(paths.html).on('change', browserSync.reload);
});

// Default Gulp.js task: compile ebverything at once then watching/reloading
gulp.task('default', ['sass', 'scripts', 'copy:vendors', 'browser-sync']);
