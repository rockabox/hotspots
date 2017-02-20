var path = require('path'),
    tsconfig = require('./tsconfig.json'),
    webpackConfig = require('./webpack.base.config.js');

module.exports = function (config) {

    tsconfig.compilerOptions.outDir = path.join(__dirname, 'tmp', 'tests');

    webpackConfig.module.loaders = [
        {
            enforce: 'post',
            test: /\.ts$/,
            exclude: /(node_modules|resources\/js\/vendor|tests)/,
            loader: 'istanbul-instrumenter'
        }
    ];

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'tests/**/*.spec.ts'
        ],
        preprocessors: {
           'tests/**/*.spec.ts': ['webpack', 'typescript']
        },
        webpack: webpackConfig,
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: '.reports/coverage',
            reporters: [
                {
                    type: 'html',
                    subdir: 'report-html'
                }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['Chrome', 'Firefox'],
        plugins: [
            require('karma-coverage'),
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-typescript-preprocessor')
        ],
        singleRun: true
    });
};
