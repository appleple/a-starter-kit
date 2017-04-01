const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const host = 'example.com';

module.exports = {
  entry: {
    js: [path.join(__dirname, 'themes/rootTheme/js/src/index.js')]
  },
  output: {
    path: path.join(__dirname, 'themes/rootTheme/js/dest/'),
    publicPath: 'http://localhost:8080/themes/rootTheme/js/dest/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
    //   {
    //     test: /\.scss$/,
    //     loader: ExtractTextPlugin.extract("style", "css?sourceMap!sass")
    //   },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      }
    ]
  },
//   plugins: [
//     new ExtractTextPlugin('bundle.css'),
//   ],
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    cache: false,
    proxy: {
      '**': {
        target: {
          host: host,
          protocol: 'http:',
          port: 80
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
};