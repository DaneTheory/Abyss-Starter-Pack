'use strict';

var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var bytediff = require('gulp-bytediff');
var exec = require('child_process').exec;
var deploy = require('gulp-gh-pages');
var runsequence = require('run-sequence').use(gulp);
var browsersync = require('browser-sync');
var reload = browsersync.reload;

var paths = {
  src: './src/',
  dev: './dev/',
  prod: './prod/',
  styles: 'styles/',
  sass: '**/*.{scss,sass}',
  css: 'css/',
  scripts: 'scripts/',
  vendor: 'vendor/',
  images: 'images/**/*.+(png|jpg|jpeg|gif|svg)',
  fonts: 'fonts/'
}

function bytediffFormatter(data) {
	var formatPercent = function(num, precision) {
		return (num * 100).toFixed(precision);
	};
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';

    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

gulp.task('bsDev', function() {
    browsersync({
        server: {
            baseDir: paths.dev,
            port: 8081
        }
    })
})

gulp.task('bsProd', function() {
    browsersync({
        server: {
            baseDir: paths.prod,
            port: 8088
        }
    })
})

gulp.task('styles', function() {
  return gulp.src([ paths.src + paths.styles + paths.sass ])
    .pipe(bytediff.start())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest( paths.dev + paths.styles + paths.css ))
    .pipe(browsersync.reload({
        stream: true
    }))
});

gulp.task('vscripts', function () {
    return gulp.src([ paths.src + paths.scripts + paths.vendor + '**/*.js' ])
        .pipe(bytediff.start())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest( paths.dev + paths.scripts + paths.vendor ))
        .pipe(browsersync.reload({
            stream: true
        }))
});

gulp.task('scripts', function () {
    return gulp.src([ paths.src + paths.scripts + '**/*.js',
                      !paths.src + paths.scripts + paths.vendor + '**/*.js' ])
        .pipe(bytediff.start())
        .pipe(concat('app.js'))
        .pipe(bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest( paths.dev + paths.scripts ))
        .pipe(browsersync.reload({
            stream: true
        }))
});

// gulp.task('html', function () {
//     return gulp.src('app/*.html')
//         .pipe(useref())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('html', function() {
  var assets = useref.assets();
  return gulp.src([ paths.src + 'index.html' ])
    .pipe(assets)
    // Minifies only if it's a CSS file
    // .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    // .pipe(gulpIf('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(paths.dev))
});

gulp.task('images', function() {
  return gulp.src([ paths.src + paths.images ])
  .pipe(cache(imagemin({
      interlaced: true,
    })))
  .pipe(gulp.dest(paths.dev + paths.images))
});

gulp.task('fonts', function() {
  return gulp.src([ paths.src + paths.fonts ])
  .pipe(gulp.dest(paths.dev + paths.fonts))
});

gulp.task('cleanDev', function(callback) {
  del(paths.dev);
  return cache.clearAll(callback);
});

gulp.task('cleanProd', function(callback) {
  del(paths.prod);
  return cache.clearAll(callback);
});

gulp.task('watch', function() {
    // gulp.watch('app/scss/**/*.scss', ['styles']);
    // gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch(paths.src + 'index.html', browserSync.reload);
});

gulp.task('deploy', function () {
  return gulp.src(paths.prod + '**/*')
    .pipe(deploy())
});

gulp.task('default', function(callback) {
  runSequence(['styles', 'vscripts', 'scripts', 'bsDev', 'watch'],
    callback
  )
});

// gulp.task('build', function(callback) {
//   runSequence('clean:dist',
//     ['sass', 'useref', 'images', 'fonts'],
//     callback
//   )
// })
