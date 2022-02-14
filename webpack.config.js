const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin =require("copy-webpack-plugin");
const svrPort=9000;
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  try{
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
  }
  catch(eee){
    return "127.0.0.1";
  }
}
const IP=getIPAdress();
module.exports = {
  entry:{
    page1:"./src/page1/index.js",
    page2:"./src/page2/index.js"
  },
  mode: "development",
  module: {
    rules: [
      {
            test: /\.(ts|tsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "ts-loader"
      }, 
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".td", ".ts", ".tsx"] },
  output: {
    path: path.resolve("./dist"),//打包文件输出到哪里
    publicPath: "/",//打包后的HRML文件里对资源的引用 前缀路径
    filename: "[name]/[chunkhash].js"
  },
  devServer: {
    contentBase: [path.resolve("./dist"),path.resolve("./stastic")],//本地服务网站的文件根目录,只有在你想要提供静态文件时才需要
    port: svrPort,
    publicPath:"/",//本地服务输出给用户的页面里，资源文件地址的前缀路径,只有在你想要提供静态文件时才需要
    historyApiFallback:true,//使得所有访问路径可以访问到首页
  },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template:"./src/page1/index.html",
        publicPath:"/",//本地服务和打包后的HTML页面里资源文件的前缀
        filename:"page1/index.html",
        chunks:['page1']
      }),
      new HtmlWebpackPlugin({
        template:"./src/page2/index.html",
        publicPath:"/",//本地服务和打包后的HTML页面里资源文件的前缀
        filename:"page2/index.html",
        chunks:['page2']
      })
     
    ]
};