var config  = require('./package'),
    gulp    = require('gulp'),
    util    = require('gulp-util'),
    concat  = require('gulp-concat'),
    compass = require('gulp-compass'),
    uglify  = require('gulp-uglify')
    minCSS  = require('gulp-minify-css'),
    colors  = require('colors');

var paths   = {
  scripts: {
      app: [
        'src/js/**/*.js',
        'src/js/*.js'
      ],
      vendor: [
          // 'bower_components/angular/angular.min.js'
          'bower_components/angular/angular.js'
          // 'src/js/vendor/*.js'
      ],
      dest: {
        app: 'js',
        vendor: 'js/vendor'
      }
    },
  styles: {
      app: 'src/sass/**/*.sass',
      vendor: [
        'bower_components/foundation/scss/*.scss',
        'bower_components/foundation/scss/**/*.scss',
        '!bower_components/foundation/scss/normalize.scss'
      ],
      src: 'src/sass',
      dest: 'css'
  }
};

// Javascript
gulp.task('scripts', function() {
  // Application scripts
  gulp.src(paths.scripts.app)
    // For production
    // .pipe(uglify())
    // .pipe(concat('app.min.js'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.scripts.dest.app));
  console.log('[' + '.js'.green + '] - app.js           Finished');

  // Vendor Scripts
  gulp.src(paths.scripts.vendor)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.scripts.dest.vendor));
  console.log('[' + '.js'.green + '] - vendor.min.js    Finished');
});

// Sass
gulp.task('sass', function () {
  // Vendor Styles
  gulp.src(paths.styles.vendor)
    // Fix relative path in global.scss
    .pipe(gulp.dest(paths.styles.src));

  // Application styles
  gulp.src(paths.styles.app)
    .pipe(compass({
      css: './css',
      sass: './src/sass',
      image: './images'
    }))
    .on('error', function (err) {
      return console.log('[' + '.css'.green + '] - ' + err);
    })
    // Production
    // .pipe(minCSS())
    .pipe(gulp.dest(paths.styles.dest));
  console.log('[' + '.css'.green + '] - app.css        Finished');
});

// Watch
gulp.task('watch', function () {
  gulp.watch(paths.scripts.app, ['scripts']);
  gulp.watch(paths.scripts.vendor, ['scripts']);
  // gulp.watch(paths.styles.vendor, ['sass']);
  // gulp.watch(paths.styles.app, ['sass']);
});

gulp.task('default', ['scripts', 'watch']);
