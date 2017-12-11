const gulp = require('gulp');
const path = require('path');
const del = require('del');
const history = require('connect-history-api-fallback');
const $ = require('gulp-load-plugins')({
  pattern: ['*', '!jshint', '!connect-history-api-fallback']
});
const jetpack = require('fs-jetpack');

const environment = $.util.env.type || 'development';
const isProduction = environment === 'production';
const webpackConfig = require('./webpack.config.js')[environment];
const merge = require('merge-stream');
const rename = require('gulp-rename');

const port = $.util.env.port || 9000;
const src = 'src/';
const dist = 'dist/';
const tests = 'tests/';

const config = [
  {
    dist: 'dist/',
    html: 'index.html'
  },
  {
    dist: 'dist/login/',
    html: 'login.html'
  }
];

gulp.task('scripts', () => {
  let entryPoint = webpackConfig.entryPointsConfig.main;
  gulp
    .src([entryPoint.fullPath])
    .pipe($.webpackStream(webpackConfig.getConfig(entryPoint.webpackEntry)))
    .on('error', function(error) {
      $.util.log($.util.colors.red(error.message));
      this.emit('end');
    })
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title: 'js' }))
    .pipe($.connect.reload());
});

gulp.task('scripts:login', () => {
  let entryPoint = webpackConfig.entryPointsConfig.login_main;
  gulp
    .src([entryPoint.fullPath])
    .pipe($.webpackStream(webpackConfig.getConfig(entryPoint.webpackEntry)))
    .on('error', function(error) {
      $.util.log($.util.colors.red(error.message));
      this.emit('end');
    })
    .pipe(gulp.dest(dist + 'login/js/'))
    .pipe($.size({ title: 'js' }))
    .pipe($.connect.reload());
});

gulp.task('html', () => {
  var tasks = config.map(resource => {
    return gulp
      .src(src + resource.html)
      .pipe(rename('index.html'))
      .pipe(gulp.dest(resource.dist))
      .pipe($.size({ title: 'html' }))
      .pipe($.connect.reload());
  });
  return merge(tasks);
});

gulp.task('html:denied', () => {
  return gulp
    .src(src + 'denied.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title: 'html:denied' }))
    .pipe($.connect.reload());
});

gulp.task('styles', () => {
  var tasks = config.map(resource => {
    return gulp
      .src(src + 'styles/main.scss')
      .pipe($.sass({ outputStyle: isProduction ? 'compressed' : 'expanded' }))
      .pipe(gulp.dest(resource.dist + 'css/'))
      .pipe($.connect.reload());
  });
  return merge(tasks);
});

gulp.task('serve', () => {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35728
    },
    middleware: (connect, opt) => {
      return [history()];
    }
  });
});

gulp.task('static', cb => {
  return gulp
    .src(src + 'static/**/*')
    .pipe($.size({ title: 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});

gulp.task('watch', () => {
  gulp.watch([src + 'styles/**/*.scss', src + 'common/**/*.scss'], ['styles']);
  gulp.watch([src + 'index.html', src + 'login.html'], ['html']);

  // gulp.watch(
  //   [src + 'login_app/**/*.js', src + 'login_app/**/*.hbs'],
  //   ['scripts:login']
  // );
});

gulp.task('lint', () => {
  return gulp
    .src([src + 'app/**/*.js', tests + '**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('test', $.shell.task('npm test'));

gulp.task('clean', cb => {
  del([dist], cb);
});

gulp.task('environment', () => {
  const projectDir = jetpack;
  const commonDir = jetpack.cwd('./' + src + 'common');
  const configFile = './config/env_' + environment + '.json';

  projectDir.copy(configFile, commonDir.path('env.json'), { overwrite: true });
});

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('build', cb => {
  if (isProduction) {
    $.runSequence(
      'clean',
      'environment',
      'static',
      'html',
      'html:denied',
      'scripts',
      'scripts:login',
      'styles',
      cb
    );
  } else {
    $.runSequence(
      'clean',
      'environment',
      'static',
      'html',
      'html:denied',
      'scripts',
      'scripts:login',
      'styles',
      cb
    );
  }
});
