/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'fixture'],

    files: ['tests/globals.js', 'tests/**/*test.js', 'src/**/*.html'],

    preprocessors: {
      'tests/*': ['webpack'],
      'tests/**/*': ['webpack'],
      'src/**/*.html': ['html2js']
    },

    webpack: {
      resolve: {
        fallback: __dirname + '/webpack/helpers'
      },
      module: {
        loaders: [
          { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.hbs$/, loader: 'handlebars-loader' },
          { test: /\.json$/, loader: 'json-loader' },
          {
            test: /\.(png|jp(e*)g|svg)$/,
            loader: 'url-loader'
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: {
        colors: true
      },
      quiet: true
    },

    reporters: ['spec'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_DISABLE,

    captureConsole: true,

    autoWatch: true,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    singleRun: true,

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-spec-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-fixture'),
      require('karma-html2js-preprocessor')
    ]
  });
};
