const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const babelPlugins = [];

const config = {
  cache: true,
  entry: {
    'bundle': `./themes/${pkg.config.theme}/src/js/index.js`
  },
  output: {
    path: __dirname,
    filename: `./themes/${pkg.config.theme}/dest/[name].js`
  },
  module: {
    rules: [
    //   {
    //     test: /\.(js)$/,
    //     exclude: /node_modules/,
    //     enforce: 'pre',
    //     use: {
    //       loader: 'eslint-loader',
    //       options: {
    //         fix: true,
    //         failOnError: false
    //       }
    //     }
    //   },
      {
        test: /\.(js)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015','stage-0', 'react'],
            plugins: babelPlugins
          }
        }
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 20480
          }
        },
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  );
  babelPlugins.push("transform-remove-strict-mode");
  babelPlugins.push("babel-plugin-transform-dead-code-elimination");

} else {
  config.devtool = "inline-source-map";
}

module.exports = config;
