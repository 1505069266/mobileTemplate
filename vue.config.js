const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  devServer: {
    open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "http://10.1.1.37:8021",
        changeOrigin: true
      },
    },
    port: 3000, //运行端口号
    contentBase: "src", //指定跟目录
    hot: true, //启用热更新
    // openPage: 'index.html'//设置默认启动页面
    historyApiFallback: true
  },
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失效
    config.plugin("html").tap(args => {
      args[0].title = "技术数据管理平台";
      return args;
    });
  },
  css: {
    sourceMap: true
  },
  configureWebpack: config => {
    config.devtool = "source-map";
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/assets/files"),
            to: "./files",
            globOptions: {
              ignore: [".*"]
            }
          }
        ]
      })
    );
  }
};
