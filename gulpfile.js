var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack-stream');
var del = require('del');

var jshint = require('gulp-jshint');
// define the default task and add the watch task to it
gulp.task('default', ['clean', 'webpack', 'start']);

gulp.task('clean', function() {
  return del([
    '/build'
  ]);
});

gulp.task('webpack', function() {
  return gulp.src('app/client.js')
    .pipe(webpack({
      resolve: {
        extensions: ["", ".js", ".jsx"]
      },
      output: {
        filename: 'client.js'
      },
      // module: {
      //   loaders: [{
      //     test: /\.css$/,
      //     loader: 'style!css'
      //   }, {
      //     test: /\.sass$/,
      //     loader: ExtractTextPlugin.extract("style-loader",
      //       "css-loader!sass-loader")
      //   }, {
      //     test: /\.jsx$/,
      //     loader: "jsx-loader"
      //   }],
      // },
      // plugins: [new ExtractTextPlugin("client.css")],
      stats: {
        colors: true
      },
      devtool: "source-map",
      watch: true,
      keepalive: true
    }))
    .pipe(gulp.dest('build/'));
})

// configure the jshint task
gulp.task('lint', function() {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('start', function() {
  nodemon({
      script: 'app.js',
      ext: "js, jsx",
      options: {
        ignore: ["build/**"],
      },
      env: {
        'NODE_ENV': 'development'
      }
    })
    .on('restart', function() {
      console.log('restarted!')
    })
});
