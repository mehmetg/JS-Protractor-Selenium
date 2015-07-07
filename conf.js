// conf.js
exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  // seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
  specs: ['spec.js'],
  capabilities: {
  	browserName: 'firefox'
  }
}
