var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'relayr-browser-sdk.min.js', //minified bundle excludes node modules
    library: 'relayr',
    libraryTarget: 'umd',
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    }]
  }
};
