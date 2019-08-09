const webpack = require('webpack');
const pkg = require('./package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveStrictPlugin = require('remove-strict-webpack-plugin');
const autoprefixer = require('autoprefixer');

const babelPlugins = [
  'transform-es3-property-literals',
  'transform-es3-member-expression-literals',
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread'
];

const enabledSourceMap = (process.env.NODE_ENV !== 'production');

const config = {
  cache: true,
  entry: {
    bundle: `${__dirname}/themes/${pkg.config.theme}/src/js/index.js`
  },
  output: {
    path: `${__dirname}/themes/${pkg.config.theme}/dest/`,
    filename: `[name].js`,
    // chunkFilename: `[name].chunk.js?date=${new Date().getTime()}` // dynamic import
  },
  // optimization: {
  //   splitChunks: {
  //     name: 'vendor',
  //     chunks: 'initial'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: /js\/src/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
                {
                  targets: {
                    ie: 11,
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ],
            ],
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
              plugins: [
                // Autoprefixer
                autoprefixer({
                  grid: true
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 20480
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `themes/${pkg.config.theme}/fonts/`,
              publicPath: path => `fonts/${path}`,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: `[name].chunk.css?date=${new Date().getTime()}`
    }),
    new RemoveStrictPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  babelPlugins.push('babel-plugin-minify-dead-code-elimination');
} else {
  config.mode = 'development';
  config.devtool = 'inline-source-map';
  config.devServer = {
    open: true,
    openPage: '',
    inline: true,
    hot: false,
    contentBase: `${__dirname}/themes/${pkg.config.theme}/dest`,
    publicPath:`/themes/${pkg.config.theme}/dest/`,
    watchContentBase: true,
    port: 3000,
    proxy: {
      '**': {
        target: {
          host: pkg.config.local,
          protocol: 'http:',
          port: 80
        },
        secure: false,
        changeOrigin: true
      }
    }
  };
}

module.exports = config;
