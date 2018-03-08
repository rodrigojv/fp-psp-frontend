/* eslint import/no-extraneous-dependencies:0 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'js/main': './src/app/main',
    'js/login_main': './src/login_app/login_main',
    vendor: ['jquery', 'bootstrap', 'backbone', 'backbone.marionette', 'lodash']
  },
  resolve: {
    fallback: path.join(__dirname, 'helpers')
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /bootstrap.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es|en/),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(require('../package.json').version)
    })
  ]
};
