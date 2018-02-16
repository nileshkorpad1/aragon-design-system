import {browser, by, element} from 'protractor';

describe('wtf2-card', () => {

  beforeEach(async () => await browser.get('/cards'));

  it('should show a card', async () => {
    expect(await element(by.tagName('wtf2-card'))).toBeDefined();
  });

});
