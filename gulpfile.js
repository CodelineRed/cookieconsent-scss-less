var gulp        = require('gulp');
var minifyCss   = require('gulp-clean-css');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var less        = require('gulp-less');
var sourcemaps  = require('gulp-sourcemaps');

var sourcePath  = "src/";
var distPath    = "dist/";

// processing scss to css and minify result
gulp.task('scss', function() {
    return gulp.src(sourcePath + 'scss/cookieconsent.scss')
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distPath + 'css/'));
});

// processing less to css and minify result
gulp.task('less', function() {
    return gulp.src(sourcePath + 'less/cookieconsent.less')
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distPath + 'css/'));
});

// add the watcher
gulp.task('watch', function() {
    // watch scss files
    gulp.watch(sourcePath + 'scss/**', ['scss']);
    // watch less files
//    gulp.watch(sourcePath + 'less/**', ['less']);
});

// production
gulp.task('prod', ['scss']);

// default task if just called gulp (incl. Watch)
gulp.task('default', ['scss', 'watch'], function() {
    gulp.watch(distPath + '**/*.{css,js}').on('change', browserSync.reload);
});