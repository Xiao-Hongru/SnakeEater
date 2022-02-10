const path = require('path');
var webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  // 入口文件
  entry: "./src/index.ts",

  //指定打包文件所在目录
  output: {
    //指定目录
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
      const: false,
    }
  },
  //webpack打包时使用的模块
  module: {
    // 指定加载规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的Loader
        use: [
          //配置babel
          {
            //指定加载器
            loader: 'babel-loader',
            options: {
              //设置预定义环境
              presets: [
                [
                  //指定环境插件
                  '@babel/preset-env',
                  {
                    "targets": { "chrome": "88", "ie": "11" },
                    "corejs": "3",
                    // 使用corejs的方法，按需加载
                    "useBuiltIns": "usage"
                  },
                ]
              ]
            }
          },
          'ts-loader'],
        //要排除的文件
        exclude: /node_modules/
      },
      {
        test: /(\.less$)|(\.css$)/,
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader",
        ]
      }
    ],
  },
  mode: 'development',
  //配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title:"自定义title",
      template: './src/index.html'
    }),
  ],
  // 用来设置引入模块，哪些文件可以作为模块来引入
  resolve: {
    extensions: ['.ts', '.js']
  }

}