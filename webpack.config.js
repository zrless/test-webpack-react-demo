const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
//热更新HMR
module.exports = {
  //引入的文件不需要写后缀,在resolve中匹配
  resolve: {
    extensions: [".js", ".jsx", "json"],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        //加快打包速度
        cache: true,
        terserOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
          },
        },
      }),
    ],
  },
  entry: path.resolve(__dirname, "./src/index.jsx"),
  output: {
    path: path.join(__dirname, "dist"), //必须是绝对路径
    filename: "bundle.js", //打包文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.less$/,
      //   use: ["style-loader", "css-loader", "less-loader"],
      // },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              require.resolve("@babel/preset-react"),
              [require.resolve("@babel/preset-env", { modules: false })],
            ],
            // cacheDirectory: true,    //编译的内容加缓存提高性能
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/src/index.html"),
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new WebpackBundleAnalyzer(),
  ],
  devServer: {
    hot: true,
    port: 3000,
  },
};
