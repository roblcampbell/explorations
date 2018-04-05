// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-htmlfile-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'cobertura', 'text'],
      fixWebpackSourcePaths: true,
      thresholds: {
        global: {
          statements: 95,
          lines: 95,
          branches: 95,
          functions: 95
        },
        each: {
          statements: 90,
          lines: 90,
          branches: 90,
          functions: 90,
        }
      },
    },
    angularCli: {
      environment: 'dev'
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=' + randomIntFromInterval(9222, 10222)
        ]
      }
    },
    htmlReporter: {
      outputFile: 'tmp/unitTestReport.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: 'eca-my-app-name-ui',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },
    reporters: ['progress', 'kjhtml', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  });
};
