const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

const paths = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

module.exports = {
  mode: process.env.NODE_ENV,
  externals: {
    paths: paths
  },
  entry: {
    app: paths.src
  },
  output: {
    filename: `${paths.assets}js/[name].bundle.js`,
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
        test: /\.(png|jpg|svg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `${paths.src}/configs/postcss.config.js`}
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
      filename: `${paths.assets}css/[name].bundle.css`,
    })
  ]
}
