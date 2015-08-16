// grab our packages
var gulp = require('gulp');
var gutil = require('gulp-util')
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

input = {
    'sass': 'sources/scss/**/*.scss',
    'javascript': 'public/javascripts/**/*.js',
    'stylesheet': 'public/stylesheets/**/*.css',
    'vendorjs': 'public/assets/javascript/vendor/**/*.js'
  },

  output = {
    'stylesheets': 'public/assets/stylesheets',
    'javascript': 'public/assets/javascript'
  };

// run the watch task when gulp is called without arguments
gulp.task('default', ['watch']);

// run javascript through jshint
gulp.task('jshint', function() {
  return gulp.src(input.javascript)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// concat javascript files, minify if --type production
gulp.task('build-js', function() {
  return gulp.src(input.javascript)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    // only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.javascript));
});

// prefix css files
gulp.task('autoprefixer', function() {
  return gulp.src(input.stylesheet)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});
// Watch these files for changes and run the task on update
gulp.task('watch', function() {
  gulp.watch(input.javascript, ['jshint', 'build-js']);
});
