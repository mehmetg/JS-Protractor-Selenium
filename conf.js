// conf.js
exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  // seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
  specs: ['specs/*spec.js'],

  // restartBrowserBetweenTests: true,


  multiCapabilities: [{
    browserName: 'firefox',
    version: '32',
    platform: 'OS X 10.10',
    shardTestFiles: true,
    name: "firefox-tests",
    maxInstances: 10
  }, {
    browserName: 'chrome',
    version: '41',
    platform: 'Windows 7',
    shardTestFiles: true,
    name: "chrome-tests",
    maxInstances: 10
  }]
}
