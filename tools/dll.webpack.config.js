const
    join = require('path').join,
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    root = require('../server/config').paths.root,
    outputPath = join(root, 'dist');

module.exports = {
    entry: {
        vendor: [
            'react',
            'd3',
            'react-dom',
            'react-router',
            'react-router-redux',
            'redux-thunk',
            'redux',
            'react-redux'
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    output: {
        filename: '[name].dll.js',
        path: outputPath,
        library: '[name]',
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: root,
            verbose: false,
        }),
        new webpack.DllPlugin({
            name: '[name]',
            path: join(outputPath, '[name].json')
        })
    ]
};
