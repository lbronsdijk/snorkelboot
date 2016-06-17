var gulp      = require('gulp');
var less      = require('gulp-less');
var watch     = require('gulp-watch');
var prefix    = require('gulp-autoprefixer');
var plumber   = require('gulp-plumber');
var rework    = require('gulp-rework');
var reworkUrl = require('gulp-rework-urls');
var concat    = require('gulp-concat');
var path      = require('path');

// Transform vendor image urls
function reworkVendorImage(url) {
    if (/(.png|.gif|.jpg|.jpeg|.svg)/.test(url)) {
        return '../images/' + path.basename(url);
    }
    return url;
}

// Transform vendor font urls
function reworkVendorFont(url) {
    if (/(.ttf|.woff|.woff2|.eot|.svg)/.test(url)) {
        return '../fonts/' + path.basename(url);
    }
    return url;
}

gulp.task('less', function() {
    return gulp.src('./resources/less/app.less')  // only compile the entry file
        .pipe(plumber())
        .pipe(less())
        .pipe(prefix("last 2 version"), {cascade: true})
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./resources/'))
        .pipe(reworkUrl(reworkVendorFont))
        .pipe(reworkUrl(reworkVendorImage))
        .pipe(plumber.stop())
        .pipe(gulp.dest('../app/public/css/'));
});

// Copy vendor fonts to vendor folder
gulp.task('copy-fonts', function () {
    gulp.src('./resources/fonts/*.{ttf,woff,woff2,eot,svg}')
        .pipe(gulp.dest('../app/public/fonts'));
    return gulp.src('./resources/fonts/*.{ttf,woff,woff2,eot,svg}')
        .pipe(gulp.dest('../app/public/fonts'));
});

// Copy vendor images to vendor folder
gulp.task('copy-images', function () {
    gulp.src('./resources/img/*.{png,gif,jpg,jpeg,svg}')
        .pipe(gulp.dest('../app/public/images'));
    return gulp.src('./resources/img/*.{png,gif,jpg,jpeg,svg}')
        .pipe(gulp.dest('../app/public/images'));
});

gulp.task('watch', function() {
    gulp.watch('./resources/less/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('default', ['copy-fonts', 'copy-images', 'less', 'watch']); // Default will run the 'entry' watch task
