const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const host = 'dev.web-components';
const port = 8080;

module.exports = {
  devServer: {
    port,
    compress: true,
    historyApiFallback: { index: '/' },
    allowedHosts: [host],
    contentBase: path.resolve(__dirname, 'sandbox'),
  },
  mode,
  context: path.resolve(__dirname, 'src'),
  entry: ['./index.js'],
  output: {
    publicPath: '/',
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'sandbox', 'index.html'),
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'babel-loader',
      },
    ],
  },
};
