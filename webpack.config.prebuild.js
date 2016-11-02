var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['./src/vendor.js']
    },
    output: {
        path: path.resolve(__dirname, 'src/views/js'),
        filename: 'vendor.bundle.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'src/views/js', '[name]-manifest.json'),
            name: '[name]',
            context: path.resolve(__dirname, 'src/views/js')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        root: path.resolve(__dirname, 'src'),
        modulesDirectories: ['node_modules']
    },
    target: 'electron-renderer'
};
