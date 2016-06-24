// conf.js
var jasmineReporters = require('jasmine-reporters');
var HttpsProxyAgent = require('https-proxy-agent');
var q = require('q');

const PROXY_URL_WITH_PORT = "http://phxappgwe2-vip.phx.aexp.com:9090";
var agent = new HttpsProxyAgent(PROXY_URL_WITH_PORT);

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  sauceAgent: agent,
  webDriverProxy: PROXY_URL_WITH_PORT
  //seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
  specs: ['specs/*spec.js'],

  restartBrowserBetweenTests: true,

  onPrepare: function(){
      var caps = browser.getCapabilities()
  },

  framework: 'jasmine2',

  getMultiCapabilities: function () {
      var deferred = q.defer();
      var multiCaps = [{
          browserName: 'firefox',
          version: '32',
          platform: 'OS X 10.10',
          name: "firefox-tests",
          shardTestFiles: true,
          maxInstances: 25
      }, {
          browserName: 'chrome',
          version: '41',
          platform: 'Windows 7',
          name: "chrome-tests",
          shardTestFiles: true,
          maxInstances: 25
      }];
      for (var i = 0; i < multiCaps.length; i++) {
          multiCaps[i].build = process.env.BUILD_TAG;
      }
      deferred.resolve(multiCaps);
      return deferred.promise;
  },

  onPrepare: function() {
      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
          consolidateAll: true,
          savePath: 'testresults',
          filePrefix: 'xmloutput'
      }));
  },

  onComplete: function () {
      browser.getSession().then(function (session) {
        return browser.getProcessedConfig().then(function (config) {
              // config.capabilities is the CURRENT capability being run, if
              // you are using multiCapabilities.
              console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + config.capabilities.name);
              return browser.get
          });
      });
  }
}
