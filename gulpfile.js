/**
 * Load Gulp and plugins
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var npmDist = require('gulp-npm-dist');
var uglify = require('gulp-uglify');
var pump = require('pump');
var purge = require('gulp-css-purge');
var reload = browserSync.reload;

/**
 * Store all paths
 */

var paths = {
    sass: './sources/scss/**/*.scss',
    js: './sources/javascripts/*.js',
    img: './sources/images/',
    html: './public/views/*.html'
};

/**
 * Copy dependencies
 * from npm_modules to ./public/vendors/
 * @see https://github.com/dshemendiuk/gulp-npm-dist
 */

gulp.task('copy:vendors', function () {
    gulp.src(npmDist(), { base: './node_modules' }).pipe(
        gulp.dest('./public/vendors')
    );
});

/**
 * Sass task for live injecting into all browsers
 */

gulp.task('sass', function () {
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

gulp.task('sass:production', function () {
    return gulp
        .src(paths.sass)
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

gulp.task('script', function () {
    pump([gulp.src(paths.js), uglify(), gulp.dest('./public/javascripts')]);
});

/**
 * Serve and watch the scss/pug files for changes
 */

gulp.task('browser-sync', function () {
    browserSync.init({
        // injectChanges: true,
        proxy: 'boilertemplate.test'
    });
    gulp.watch(paths.sass, ['sass']).on('change', browserSync.reload);
    gulp.watch(paths.js, ['script']).on('change', browserSync.reload);
    gulp.watch(paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'script', 'copy:vendors', 'browser-sync']);
