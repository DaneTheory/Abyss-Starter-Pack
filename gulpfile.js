'use strict';

var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    gulpif = require('gulp-if'),
    bytediff = require('gulp-bytediff'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    deploy = require('gulp-gh-pages'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload;
var exec = require('child_process').exec;
var runsequence = require('run-sequence').use(gulp);

var paths = {
  src: './src/',
  dev: './dev/',
  prod: './prod/',
  styles: 'styles/',
  sass: '**/*.{scss,sass}',
  css: 'css/',
  scripts: 'scripts/',
  vendor: 'vendor/',
  images: 'images/',
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
            baseDir: paths.dev
        },

        port: 8081
    })
})

gulp.task('bsProd', function() {
    browsersync({
        server: {
            baseDir: paths.prod
        },

        port: 8088
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
    .pipe(gulp.dest( paths.src + paths.styles + paths.css ))
    .pipe(gulp.dest( paths.dev + paths.styles + paths.css ))
    .pipe(browsersync.reload({
        stream: true
    }))
})

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
})

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
})

// gulp.task('html', function () {
//     return gulp.src('app/*.html')
//         .pipe(useref())
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('html', function() {
  // var assets = useref.assets();
  // return gulp.src('./src/*.html')
    // .pipe(assets)
    // Minifies only if it's a CSS file
    // .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    // .pipe(gulpIf('*.js', uglify()))
    //.pipe(assets.restore())
    // .pipe(useref())
    // .pipe(gulp.dest(paths.dev))
// })

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dev'))
    .pipe(browsersync.reload({
        stream: true
    }))
})

gulp.task('images', function() {
  return gulp.src([ paths.src + paths.images + '**/*.+(png|jpg|jpeg|gif|svg)' ])
    .pipe(bytediff.start())
    .pipe(cache(imagemin({
        interlaced: true,
      })))
    .pipe(bytediff.stop(bytediffFormatter))
  .pipe(gulp.dest(paths.dev + paths.images))
})

gulp.task('fonts', function() {
  return gulp.src([ paths.src + paths.fonts + '**/*.*'])
  .pipe(gulp.dest(paths.dev + paths.fonts))
})

gulp.task('cleanDev', function(callback) {
  del(paths.dev);
  return cache.clearAll(callback);
})

gulp.task('cleanProd', function(callback) {
  del(paths.prod);
  return cache.clearAll(callback);
})

gulp.task('watch', function() {
    gulp.watch(paths.src + '*.html', ['html']);
    gulp.watch(paths.src + paths.styles + paths.sass, ['styles']);
    gulp.watch(paths.src + paths.scripts + paths.vendor + '**/*.js', ['vscripts']);
    gulp.watch([ paths.src + paths.scripts + '**/*.js', !paths.src + paths.scripts + paths.vendor + '**/*.js'], ['scripts']);
    gulp.watch(paths.src + paths.fonts + '**/*.+(eot|svg|ttf|woff|woff2)', ['fonts']);
    gulp.watch(paths.src + paths.images + '**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
})

gulp.task('deploy', function () {
  return gulp.src(paths.prod + '**/*')
    .pipe(deploy())
})

gulp.task('default', function(callback) {
  runsequence(['images', 'fonts', 'styles', 'vscripts', 'scripts', 'html', 'bsDev', 'watch'],
    callback
  )
})

// gulp.task('build', function(callback) {
//   runSequence('clean:dist',
//     ['sass', 'useref', 'images', 'fonts'],
//     callback
//   )
// })
