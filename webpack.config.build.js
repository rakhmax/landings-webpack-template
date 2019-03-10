const merge = require('webpack-merge');
const common = require('./webpack.config.common');

const build = merge(common, {
  plugins: []
})

module.exports = new Promise((resolve, reject) => {
    resolve(build);
})
