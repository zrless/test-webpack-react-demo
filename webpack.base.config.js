const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

//分析打包的文件(大小)
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const os = require("os");
const HappyPack = require("happypack");

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

//tree-shaking  //消除不好的代码,无用的代码(DCE)

//热更新HMR
module.exports = {
  //引入的文件不需要写后缀,在resolve中extensions中匹配
  resolve: {
    extensions: [".js", ".jsx", "json"],
    // 路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  entry: {
    //多入口
    index: path.resolve(__dirname, "./src/index.jsx"),
    other: path.resolve(__dirname, "./src/other.jsx"),
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        //比较小的图片会转成base64格式,可以减少http请求
        //比较大的图片会跟file-loader一样,打包到文件夹,发送发送请求,防止页面首次渲染太慢
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              outputPath: "/img/",
            },
          },
          // {
          //   loader: "file-loader"
          // },
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_module/,
        use: [
          /**
           * 开启多进程打包,项目比较大可能需要用到
           * 进程启动大概为600ms,进程通信也占资源
           * 只有工作消耗时间比较长,才需要多进程打包
           */
          // "thread-loader",
          {
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
          // {
          //   loader: "eslint-loader",  //打包时做eslint语法检查
          //   options: {}
          // }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/src/index.html"),
      filename: "index.html",
      chunks: ["index", "vendor", "common"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/src/other.html"),
      filename: "other.html",
      chunks: ["other", "common"],
    }),
    //离线访问
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1.帮助servicework快速启动
       * 2.删除旧的servicework
       * 
       * 生成一个service-work.js文件
       */
      clientsClaim: true,
      skipWaiting: true
    }),

    new HappyPack({
      id: "jsx",
      //多线程  根据cpu数量创建线程池,效率更高
      threads: os.cpus().length,
      //url-loader  file-loader 不支持
      loaders: ["babel-loader"],
    }),
    // new WebpackBundleAnalyzer(),
  ],
  devServer: {
    hot: true,
    port: 3000,
  },
  externals: {
    //拒绝jQuery被打包到bundle中
    jquery: "jQuery"
  }
};
