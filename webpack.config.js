const { resolve } = require('path');

const config = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: resolve(__dirname, './output'),
    filename: 'app.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
