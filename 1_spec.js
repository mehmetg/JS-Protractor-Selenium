// spec.js
describe('Protractor Demo App1', function() {
  it('should have a title', function() {
    browser.get('http://yahoo.com');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});
