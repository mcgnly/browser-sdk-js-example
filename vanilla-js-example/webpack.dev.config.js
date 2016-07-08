var path = require('path');
var webpack = require('webpack');

module.exports = {
    loaders: [{
        test: /\.es6\.js$/,
        loader: "babel-loader",
        query: {
            presets: ['es2015']
        }
    }],
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/js-script'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'relayr-example.js', //bundle includes node_modules
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel']
        }]
    }
};