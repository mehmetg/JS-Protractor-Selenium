// conf.js

var HttpsProxyAgent = require("https-proxy-agent");

var sauceConnectRelayPort = process.env.SELENIUM_PORT;
var agent = new HttpsProxyAgent('http://localhost:56193');
exports.config = {

    sauceSeleniumAddress: 'localhost:' + sauceConnectRelayPort + '/wd/hub',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    sauceAgent: agent,

    specs: ['specs/*spec.js'],

    restartBrowserBetweenTests: true,

    onPrepare: function(){
    var caps = browser.getCapabilities()
},

multiCapabilities: [{
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
}],

    onComplete: function () {

        var printSessionId = function (jobName) {
            browser.getSession().then(function (session) {
                var sId = 'SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName + "\n";
                fs.appendFile((process.env.BUILD_TAG + '.txt'), sId, function (err) {
                    console.error(err);
                });
                console.log(sId);
            }
            printSessionId(process.env.BUILD_TAG);
        }
    }
}
