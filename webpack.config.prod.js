const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    js: [path.join(__dirname, 'themes/root/js/src/index.js')]
  },
  output: {
    path: path.join(__dirname, 'themes/root/js/dest/'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new ExtractTextPlugin('bundle.css'),
  ]
};