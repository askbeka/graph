var join = require('path').join;
var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');
var app = require('./../server/server');
var dllConfig = require('./dll.webpack.config');
var serverConfig = require('../server/config');

webpack(dllConfig, (err, stats) => {

    if (err) {
        console.error(err.stack || err);
        process.exit(1);
    }

    console.log(stats.toString(config.stats));

    config.plugins.push(new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(join(dllConfig.output.path, 'vendor.json'))
    }));

    var compiler = webpack(config);

    app.use(devMiddleware(compiler, {
        publicPath: config.output.publicPath,
        historyApiFallback: true,
        stats: config.stats
    }));

    app.use(hotMiddleware(compiler));

    app.listen(serverConfig.port, serverConfig.host, function (err) {
        if (err) {
            return console.error(err.stack || err);
        }

        console.log(`Listening at http://${serverConfig.host}:${serverConfig.port}/`);
    });

});
