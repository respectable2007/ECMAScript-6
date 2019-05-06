const merge = require('webpack-merge');
const base = require('../build/webpack.base.config.js');
const path = require('path');
module.exports = merge(base, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9090,
    proxy: {
      'payh': {
        target: 'http://10.2.30.193:8080',
        pathRewrite: {'^/payh': '/payh'}
      }
    }
  }
})