const merge = require('webpack-merge');
const common = require('./webpack.config');
const ImageminPlugin = require('imagemin-webpack-plugin').default

const build = merge(common, {
  plugins: [
    new ImageminPlugin({
      pngquant: {
        quality: '95-100'
      }
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(build);
})
