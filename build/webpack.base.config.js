const path = require('path');
const webpackHtmlPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules | dist)/,
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  plugins: [
    new webpackHtmlPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}