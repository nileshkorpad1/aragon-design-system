import {browser, by, element} from 'protractor';

describe('button-toggle', () => {

  beforeEach(async () => await browser.get('/button-toggle'));

  it('should show a button-toggle', async () => {
    expect(await element(by.tagName('wtf2-button-toggle'))).toBeDefined();
  });

});
