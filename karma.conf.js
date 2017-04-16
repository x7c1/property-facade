const getSpecs = specList => specList ?
  specList.split(',') : [
    'src/**/*.js',
    'tests/**/*.spec.js',
  ];

const getBrowsers = browsers => browsers ?
  browsers.split(',') : [
    'Chrome',
    'Safari'
  ];

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    plugins: [
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-safari-launcher',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      "karma-webpack"
    ],

    // list of files / patterns to load in the browser
    //   e.g.
    //   $ env KARMA_SPECS="tests/foobar.spec.js" $(npm bin)/karma start
    files: getSpecs(process.env.KARMA_SPECS),

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'tests/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    mochaReporter: {
      showDiff: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: getBrowsers(process.env.KARMA_BROWSERS),

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
