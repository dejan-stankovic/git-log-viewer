const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: { path: __dirname + '/src/views/js', filename: 'bundle.js' },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node-modules/,
            query: {
                "presets": ["es2015", "react"],
                "compact": false
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve('./src')
        ]
    },
    target: "electron"
};
