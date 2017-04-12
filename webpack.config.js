const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const pkg = require('./package.json');
const url = require('url');
const host = url.parse(pkg.homepage).host;
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
const replaceText = host.replace(matchOperatorsRe, '\\$&');
const replaceRe = new RegExp(replaceText,'g');

module.exports = {
  entry: {
    js: [path.join(__dirname, `${pkg.theme}/src/js/index.js`)]
  },
  output: {
    path: path.join(__dirname, `${pkg.theme}/dest/`),
    publicPath: `http://localhost:8080/${pkg.theme}/dest/`,
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
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!sass")
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 10240
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),

    new BrowserSyncPlugin({
        host: 'localhost',
        port: 8080,
        proxy: 'http://localhost:8081/',
        rewriteRules: [
          {
            match: replaceRe,
            replace: "localhost:8080"
          }
        ]
      },
      {
        reload: false
      })
  ],
  devServer: {
    port: 8081,
    cache: false,
    colors: true,
    inline: true,
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
