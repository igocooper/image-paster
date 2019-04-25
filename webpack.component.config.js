const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  context: path.resolve(__dirname, 'src'),
  entry: ['./index.js'],
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'build')]),
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
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
