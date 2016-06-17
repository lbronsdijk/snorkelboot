// Require gulp dependecies
var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var concat  = require('gulp-concat');
var csso    = require('gulp-csso');
var uglify  = require('gulp-uglify');

// Javascript resources
var jsResources = [
        'public/vendor/angular.js',
        'public/vendor/*.js',
        'public/app.js',
        'public/controllers/*.js',
        'public/services/*.js',
        'public/filters/*.js',
        'public/directives/*.js'
    ];

// Compile javascript
gulp.task('javascript', function() {
  gulp.src(jsResources)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public'));
});

// The watcher...
gulp.task('watch', function() {
    gulp.watch('public/css/*.scss', ['sass']);
    gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/vendor'], ['javascript']);
});

// Default task
gulp.task('default', ['javascript', 'watch']);
