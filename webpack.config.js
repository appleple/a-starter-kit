const webpack = require('webpack');
const pkg = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const RemoveStrictPlugin = require('remove-strict-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
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
    publicPath: `/themes/${pkg.config.theme}/dest/`,
    filename: '[name].js',
    chunkFilename: `[name].chunk.js?date=${new Date().getTime()}`
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        include: /src\/js/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            fix: true,
            failOnError: false
          }
        }
      },
      {
        test: /\.vue$/,
        include: /src\/js/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      },
      {
        test: /\.(js|ts|tsx)$/,
        include: /src\/js/,
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
        test: /\.(scss|css)$/,
        include: /src\/(scss|js)/,
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
              sourceMap: enabledSourceMap,
              plugins: [
                autoprefixer({
                  grid: true
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
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
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,scss}'],
      fix: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new RemoveStrictPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/themes/${pkg.config.theme}/src/index.html`,
      filename: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: `[name].chunk.css?date=${new Date().getTime()}`
    }),
    new HtmlCriticalWebpackPlugin({
      base: `${__dirname}/themes/${pkg.config.theme}/dest/`,
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      width: 1420,
      height: 500,
      penthouse: {
        blockJSRequests: false
      }
    })
  ],
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
};

if (process.env.ANALYZE === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin());
}
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
    publicPath: `/themes/${pkg.config.theme}/dest/`,
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
