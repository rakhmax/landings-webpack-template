const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production'

console.log(process.env.NODE_ENV)

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets/'
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: paths.src
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  externals: {
    paths: paths
  },
  output: {
    filename: `${paths.assets}js/[name].js`,
    // chunkFilename: `${paths.assets}js/[name].bundle.js,
    path: paths.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `${paths.src}/configs/postcss.config.js` }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      { from: `${paths.src}/img`, to: `${paths.assets}img` }
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${paths.src}/index.html`,
      favicon: `${paths.src}/favicon.ico`,
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `${paths.assets}css/[name].css`,
    })
  ]
}
