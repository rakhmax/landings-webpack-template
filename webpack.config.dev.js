const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

const dev = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: [
      common.externals.paths.src,
      `${common.externals.paths.src}/partials`
    ],
    watchContentBase: true,
    hot: true
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(dev);
})
