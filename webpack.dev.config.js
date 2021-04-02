const baseConfig = require("./webpack.base.config.js");
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge").smart;
const devConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"], //根据环境做css兼容处理 也可以在postcss.config.js中添加
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"), //必须是绝对路径
    filename: "[name].js", //打包文件名
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(baseConfig, devConfig);
