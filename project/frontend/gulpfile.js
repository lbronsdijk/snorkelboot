var gulp    = require('gulp');
var less    = require('gulp-less');
var watch   = require('gulp-watch');
var prefix  = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var concat  = require('gulp-concat');
var path    = require('path');

gulp.task('less', function() {
    return gulp.src('./resources/less/app.less')  // only compile the entry file
        .pipe(plumber())
        .pipe(less())
        .pipe(prefix("last 2 version"), {cascade: true})
        .pipe(concat('app.min.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./resources/'));
});
gulp.task('watch', function() {
    gulp.watch('./resources/less/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('default', ['less', 'watch']); // Default will run the 'entry' watch task
