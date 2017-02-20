var path = require('path');

module.exports = {
    entry: {
        hotspots: path.join(__dirname, 'lib/hotspots.ts')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        modulesDirectories: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.ts', '.js']
    },
    module: {
        preLoaders: [
            { test: /\.ts$/,loader: 'tslint' }
        ],
        loaders: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        }]
    }
}
