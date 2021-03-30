const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge').smart;

const prodConfig = {
  mode: 'production'
}

module.exports = merge(baseConfig, prodConfig);