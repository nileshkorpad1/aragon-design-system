import {browser, by, element} from 'protractor';

describe('wtf2-toolbar', () => {

  beforeEach(async () => await browser.get('/toolbar'));

  it('should show a toolbar', async () => {
    expect(await element(by.tagName('wtf2-toolbar'))).toBeDefined();
  });

});
