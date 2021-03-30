const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge').smart;
const devConfig = {
  mode: "development"
}

module.exports = merge(baseConfig, devConfig);