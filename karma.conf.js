var path = require('path'),
    tsconfig = require('./tsconfig.json'),
    webpackConfig = require('./webpack.base.config.js');

// Karma configuration
// Generated on Tue Feb 09 2016 08:31:10 GMT+0000 (GMT)

module.exports = function (config) {

    tsconfig.compilerOptions.outDir = path.join(__dirname, 'tmp', 'tests');
    webpackConfig.module.postLoaders = [
        {
            test: /\.ts$/,
            exclude: /(node_modules|resources\/js\/vendor|tests)/,
            loader: 'istanbul-instrumenter'
        }
    ];

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'tests/**/*.spec.ts'
        ],

        // list of files to exclude
        exclude: [
        ],

        preprocessors: {
           'tests/**/*.spec.ts': ['webpack']
        },

        typescriptPreprocessor: {
            options: tsconfig.compilerOptions
        },

        webpack: webpackConfig,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
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

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],

        plugins: [
            require('karma-coverage'),
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-firefox-launcher')
        ],

        singleRun: true,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
