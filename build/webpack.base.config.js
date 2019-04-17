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
    }, {
      test: /\.scss$/,
      exclude: path.resolve(__dirname, './src/styles'),
      use: [{
        loader: 'style-loader'
      },{
        loader: 'sass-loader'
      },{
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]-[local]--[hash:base64:5]'
        }
      }]
    },{
      test:/\.scss$/,
      include: path.resolve(__dirname, './src/styles'),
      use: [{
        loader: 'style-loader'
      },{
        loader: 'css-loader'
      },{
        loader: 'sass-loader'
      }]
    }]
  },
  plugins: [
    new webpackHtmlPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: './favicon.ico'
    })
  ],
  node: {
    fs: 'empty'
  }
}