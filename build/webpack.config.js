const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    contentBase:path.resolve(__dirname, '../dist'),
    historyApiFallback: {
      index: 'index.html'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      // {
      //   enforce: "pre", // pre normal inline post
      //   test: /\.tsx?$/,
      //   loader: 'source-map-loader', // 从源代码中提出source map，目的是方便调试
      // },
      {
        test: /\.less?$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../index.html")
      }),
      new webpack.HotModuleReplacementPlugin()
  ]
}
