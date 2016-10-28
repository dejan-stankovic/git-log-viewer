const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: "./src/main.jsx",
        modal: './src/modal.jsx',
        vendor: [
            'electron',
            'react',
            'react-addons-pure-render-mixin',
            'react-dom',
            'react-redux',
            'redux',
            'redux-seamless-immutable',
            'redux-thunk',
            'seamless-immutable'
        ]
    },
    output: {
        path: __dirname + '/src/views/js',
        filename: '[name].bundle.js'
    },
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
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    target: "electron-renderer"
};
