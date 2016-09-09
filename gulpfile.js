var gulp = require('gulp');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon')
var babel = require('gulp-babel')
var Cache = require('gulp-file-cache')

gulp.task('sass', function() {
  return gulp.src('public/stylesheets/sass/master.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(gulp.dest('dist/css'));
});

var cache = new Cache();

gulp.task('compile', function () {
  var stream = gulp.src('public/**/*.js') // your ES2015 code
                   .pipe(cache.filter()) // remember files
                   .pipe(babel({ presets: ['es2015'] })) // compile new ones
                   .pipe(cache.cache()) // cache them
                   .pipe(gulp.dest('dist')) // write them
  return stream // important for gulp-nodemon to wait for completion
})

gulp.task('watch', ['compile'], function () {
  var stream = nodemon({
                 script: './bin/www' // run ES5 code
               , watch: 'public' // watch ES2015 code
               , ext: 'js html css'
               , tasks: ['compile'] // compile synchronously onChange
               , env: { 'NODE_ENV': 'development' }
               }).on('restart', function () {
      console.log('restarted!')
    })

  return stream
})

gulp.task('build', ['sass']);
gulp.task('default', ['build', 'watch']);
