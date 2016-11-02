const path = require('path');
const webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        main: './src/main.jsx',
        modal: './src/modal.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'src/views/js'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src')
            ],
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react'],
                compact: false
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve('./src')],
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, 'src/views/js'),
            manifest: require('./src/views/js/vendor-manifest.json')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.bundle.js'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    target: 'electron-renderer'
};
