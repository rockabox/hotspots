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
        modules: ['node_modules'],
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    }
}
