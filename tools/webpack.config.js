const
    join = require('path').join,
    HTMLPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    config = require('../server/config'),
    root = config.paths.root,
    src = join(root, 'src'),
    vendors = require('./dll.webpack.config').entry.vendor,
    isDebug = process.env.NODE_ENV !== 'production';

const webpackConfig = {
    cache: isDebug,
    devtool: isDebug ? 'eval' : false,
    entry: {
        app: [join(src, 'index.js')]
    },
    output: {
        path: config.paths.dist,
        filename: `[name].${isDebug ? '[hash]' : '[chunkhash]'}.js`,
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            '__DEV__': isDebug
        }),
        new HTMLPlugin({
            title: 'FI Architecture View',
            template: `!!pug-loader!${join(root, `./templates/${isDebug ? 'index.dev.pug' : 'index.pug'}`)}`,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        })
        // ,new webpack.ProvidePlugin({
        //     'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        // })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: src,
                options: {
                    babelrc: false,
                    cacheDirectory: isDebug,
                    presets: [['es2015', {modules: false}], 'stage-0', 'react'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    },
                    'less-loader'
                ],
                include: src
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                include: join(root, 'node_modules')
            }
        ]
    },
    stats: 'normal'
};

if (isDebug) {
    webpackConfig.entry.app.unshift(
        'react-hot-loader/patch',
        'webpack-hot-middleware/client'
        // 'webpack-hot-middleware/client?reload=true'
    );
    webpackConfig.module.loaders[0].options.plugins.push('react-hot-loader/babel');
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    webpackConfig.entry.vendor = vendors;
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
        }),
        new CleanWebpackPlugin(['dist'], {
            root: root,
            verbose: false,
        })
    );
}

module.exports = webpackConfig;
