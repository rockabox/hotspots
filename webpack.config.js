var config = require('./webpack.base.config.js'),
    path = require('path');

config.entry = {
    app: path.join(__dirname, 'src/app.ts')
}

module.exports = config;
